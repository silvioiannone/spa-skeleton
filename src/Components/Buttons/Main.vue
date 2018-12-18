<script lang="ts">

    import Button       from '../Mixins/Button.vue';
    import Component    from '../Mixins/Component.vue';
    import Vue, {VNode} from 'vue';

    export default Vue.extend({

        name: 'ButtonMain',

        mixins: [
            Button,
            Component
        ],

        props: {

            /**
             * An action that will be performed when clicking on the button.
             */
            action: {
                validator: (value: any): boolean =>
                {
                    return typeof value === 'function';
                }
            }
        },

        data()
        {
            return {
                _loading: false
            }
        },

        computed: {

            propLoading(): boolean
            {
                return this.$data._loading;
            },

            computedProps(): any
            {
                return {
                    loading: this.propLoading
                }
            }
        },

        methods: {

            /**
             * React to `click` event.
             */
            onClick(): void
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
        },

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
    });

</script>
