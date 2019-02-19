<script lang="ts">

    import { VNode }                   from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import Button                      from '../Mixins/Button.vue';
    import _Component                  from '../Mixins/Component.vue';

    @Component
    export default class ButtonMain extends Mixins(Button, _Component)
    {
        @Prop({
            validator(value: any): boolean
            {
                return typeof value === 'function'
            }
        }) action: Function;

        _loading: false

        get propLoading(): boolean
        {
            return this.$data._loading;
        }

        get computedProps(): any
        {
            return {
                loading: this.propLoading
            }
        }

        /**
         * React to `click` event.
         */
        _onClick(): void
        {
            if (this.action) {
                this.$data._loading = true;

                this.action()
                    .then(() =>
                    {
                        this.$data._loading = false;
                    })
                    .catch(() =>
                    {
                        this.$data._loading = false;
                    });
            }

            this.$emit('click', event);
        }

        render(createElement: Function): VNode
        {
            let self = this;
            return createElement(
                'v-btn',
                {
                    props: self.getProps(),
                    on: {
                        click: self.onClick
                    }
                },
                self.$slots.default
            );
        }
    }

</script>
