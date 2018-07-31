<script>

    /**
     * This mixin can be used in order to create buttons.
     */
    export default {

        props: {

            /**
             * Designates the button as icon - round and flat.
             */
            icon: {
                type: Boolean,
                default: false
            },

            /**
             * Display a small button.
             */
            small: {
                type: Boolean,
                default: false
            },

            loading: {

            }
        },

        data()
        {
            return {
                // Use this in order to override the value of a prop.
                props: {

                }
            }
        },

        methods: {

        },

        render(createElement)
        {
            let self = this;
            let props = {...this.$props, ...this.props};

            return createElement('v-btn', {
                props,
                on: {
                    click: event => {
                        self.$emit('click', event);
                        self.onClick(event);
                    }
                }
            }, this.$slots.default);
        }
    }

</script>
