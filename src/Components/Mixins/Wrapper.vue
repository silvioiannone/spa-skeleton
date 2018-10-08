<script>

    /**
     * Use this mixin when you need to create a component wrapping another component.
     *
     * The props passed to the parent component will be passed to its child component if those can
     * be applied. Any event fired by the wrapped component will be propagated by the wrapping
     * component.
     *
     * Just set the `__component` $data property.
     */
    export default {

        props: {

            value: {}
        },

        data()
        {
            return {
                // The component being wrapped.
                __component: '',
            }
        },

        computed: {

            _hasModel()
            {
                return typeof this._component.mixins[0].props.value !== 'undefined';
            },

            _component()
            {
                return this.$data.__component;
            }
        },

        methods: {

            /**
             * Get the props.
             */
            getProps()
            {
                let props = {};

                for(let propKey in this.$attrs) {
                    this.$set(props, propKey, this.$attrs[propKey]);
                }

                // If the component has a model we also need to include the value prop.
                if (this._hasModel) {
                    this.$set(props, 'value', this.value);
                }

                return props;
            },

            /**
             * Get the on event listeners.
             */
            getOn()
            {
                let on = {};

                // The only thing that we need to do is to bubble up all the events coming from the
                // wrapped component.

                // Model input event
                if (this._hasModel) {
                    on['input'] = value => { this.$emit('input', value) }
                }

                return on;
            },

            /**
             * Return the slots of the wrapped component.
             *
             * @returns {*}
             */
            getSlots()
            {
                return this.$slots.default;
            }
        },

        render(createElement)
        {
            return createElement(this.$data.__component.name, {
                    props: this.getProps(),
                    domProps: {
                        value: this.value
                    },
                    on: this.getOn()
                },
                this.getSlots()
            );
        }
    }

</script>
