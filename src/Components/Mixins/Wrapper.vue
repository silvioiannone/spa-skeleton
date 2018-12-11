<script lang="ts">

    import Vue from 'vue';

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
    export default Vue.extend({

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

            _hasModel(): boolean
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

            _component(): any
            {
                return this.$data.__component;
            }
        },

        methods: {

            /**
             * Get the props.
             */
            getProps(): any
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
                    this.$set(props, 'value', this.value);
                }

                return props;
            },

            /**
             * Get the on event listeners.
             */
            getOn(): any
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
            getSlots(): any
            {
                return this.$slots.default;
            },

            /**
             * Override the wrapped's `$emit` function.
             */
            overrideWrapped$emit(): void
            {
                if (! this.$children.length) {
                    throw "The wrapper has no children.";
                }

                // We need to override the $emit function so that we will be able to catch and fire
                // all the events fired by the wrapped component.
                let wrapped = this.$children[0];
                let childEmit = wrapped.$emit;

                wrapped.$emit = (event: any, payload: any) =>
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

        render(createElement): VNode
        {
            return createElement(
                this.$data.__component.name,
                {
                    props: this.getProps(),
                    domProps: {
                        value: this.value
                    },
                    on: this.getOn()
                },
                this.getSlots()
            );
        }
    });

</script>
