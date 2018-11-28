<script>

    /**
     * Use this mixin when you need to create a component wrapping another component.
     *
     * The point of this mixin is to act as a proxy between the wrapped component and the wrapping
     * component so that every prop that is passed to the wrapping componet is passed down to the
     * wrapped component and any event fired by the wrapped component is fired also by the wrapping
     * component.
     *
     * I created this mixin because in this way I can easily proxy all the props made available by
     * the wrapped component without having to re-declare them in the wrapping component. The same
     * logic is behind the events.
     *
     * Just set the `__component` $data property.
     */
    export default {

        props: {

            /*
             * v-model.
             */
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
                if (this._component.mixins) {
                    if (typeof this._component.mixins[0].props.value !== 'undefined')
                    return true;
                }

                if (this._component.props) {
                    return this._component.props.value;
                }

                return false;
            },

            _component()
            {
                return this.$data.__component;
            },

            /**
             * Override this computed prop in order to transform the value in case of need.
             */
            _value()
            {
                return this.value;
            }
        },

        methods: {

            /**
             * Get the props.
             */
            getProps()
            {
                let props = {};

                let propsToMerge = {
                    ...this.$props,
                    ...this.$attrs
                };

                for(let propKey in propsToMerge) {
                    this.$set(props, propKey, propsToMerge[propKey]);
                }

                // If the component has a model we also need to include the value prop.
                if (this._hasModel) {
                    this.$set(props, 'value', this._value);
                }

                return props;
            },

            /**
             * Get the on event listeners.
             */
            getOn()
            {
                let on = {};

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
            },

            /**
             * Override the wrapped's `$emit` function.
             */
            overrideWrapped$emit()
            {
                if (! this.$children.length) {
                    throw "The wrapper has no children.";
                    return;
                }

                // We need to override the $emit function so that we will be able to catch and fire
                // all the events fired by the wrapped component.
                let wrapped = this.$children[0];
                let childEmit = wrapped.$emit;

                wrapped.$emit = (event, payload) =>
                {
                    childEmit.apply(wrapped, [event, payload]);
                    this.$emit(event, payload);
                }
            }
        },

        created()
        {
            if (! this.$data.__component) {
                throw 'Wrapped component not set. Please set it using the `__component` data ' +
                      'property.';
            }
        },

        mounted()
        {
            this.overrideWrapped$emit();
        },

        render(createElement)
        {
            return createElement(
                this.$data.__component.name,
                {
                    props: this.getProps(),
                    domProps: {
                        value: this._value
                    },
                    on: this.getOn()
                },
                this.getSlots()
            );
        }
    }

</script>
