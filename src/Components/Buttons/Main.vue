<script lang="ts">

    import { VNode }                   from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import Button from '../Mixins/Button.vue';
    import MixinComponent from '../Mixins/Component.vue';

    @Component
    export class ButtonMain extends Mixins(Button, MixinComponent)
    {
        @Prop({
            validator(value: any): boolean
            {
                return typeof value === 'function'
            }
        }) action: Function;

        _loading: boolean = false;

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
        async _onClick(event: any): Promise<void>
        {
            if (this.action) {
                this.$data._loading = true;

                try {
                    await this.action();
                } finally {
                    this.$data._loading = false;
                }
            }

            this.$emit('click', event);
        }

        render(createElement: Function): VNode
        {
            return createElement(
                'v-btn',
                {
                    props: this.$props,
                    on: {
                        ...this.$listeners,
                        click: this._onClick
                    }
                },
                this.$slots.default
            );
        }
    }

    export default ButtonMain;

</script>
