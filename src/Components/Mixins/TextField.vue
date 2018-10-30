<script>

    import MixinInput from './Input';

    /**
     * This mixin can be used in order to create text fields.
     *
     * It is possible to override any of the value of the props by defining a computed value with
     * the same name.
     */
    export default {

        mixins: [
            MixinInput
        ],

        props: {

            /**
             * Make the phone input required.
             */
            required: {
                type: Boolean,
                default: false
            },

            /**
             * Value of the name attribute.
             */
            name: {
                type: String,
                default: ''
            },

            /**
             * Validation rules.
             */
            validation: {
                type: [String, Object],
                default: ''
            },

            /**
             * Input type.
             */
            type: {
                type: String,
                default: ''
            },

            /**
             * Field step size.
             */
            step: {
                type: String,
                default: '1'
            },

            /**
             * Maximum value.
             */
            max: {
                type: String
            },

            /**
             * Minimum value.
             */
            min: {
                type: String
            },

            /**
             * Input mask.
             */
            mask: {
                type: String,
                default: ''
            },

            /**
             * Input field prefix.
             */
            prefix: {
                type: String,
                default: ''
            },

            /**
             * Suffix.
             */
            suffix: {
                default: ''
            },

            /**
             * Placeholder.
             */
            placeholder: {
                type: String,
                default: ''
            },

            /**
             * Display the text field with a "solo" style.
             */
            solo: {
                type: Boolean,
                default: false
            },

            /**
             * Prepend an icon to the text field.
             */
            prependIcon: {
                type: String,
                default: ''
            },

            /**
             * Prepend an icon to the text field.
             */
            appendIcon: {
                type: String,
                default: ''
            },

            /**
             * Make the text field clearable.
             */
            clearable: {
                type: Boolean,
                default: false
            },

            /**
             * Set the validation alias.
             */
            vvAs: {
                type: String
            },

            /**
             * Creates counter for input length; if no number is specified, it defaults to 25. Does
             * not apply any validation.
             */
            counter: {
                type: Number,
                default: undefined
            }
        },

        data()
        {
            return {
                isFocused: false
            }
        },

        computed: {

            /**
             * Override this in order to specify a class that should be applied to the input
             * element.
             */
            _class()
            {
                return '';
            },

            /**
             * This can be overridden in order to modify the value passed to the `v-text-field`.
             */
            _value()
            {
                return this.value;
            }
        },

        methods: {

            /**
             * Bubble the input event.
             *
             * This method is declared here instead of the event definition because this way it can
             * be easily overridden.
             *
             * @param value
             */
            fireInputEvent(value) {
                this.$emit('input', value);
            },

            /**
             * Access the form containing the text field.
             */
            parentForm()
            {
                return this.$parent.$parent.$parent;
            }
        },

        mounted()
        {
            // This is a work-around needed in order to prevent Vuetify text-input mask to trigger
            // the validation too soon.
            let input = this.$el.querySelector('input');
            input.addEventListener('focus', () =>
            {
                this.isFocused = true;
            });
            input.addEventListener('blur', () =>
            {
                this.isFocused = false;
            });
        },

        watch: {

            value()
            {
                // Trigger the validation on the next tick but only if the input is dirty
                if (this.$children[0].isDirty) {
                    this.$nextTick(() => this.$validator.validateAll());
                }
            }
        },

        render(createElement)
        {
            let self = this;

            let props = {
                ...this.$props,
                errorMessages: this._errorMessages,
                value: this._value
            };

            return createElement('v-text-field', {
                attrs: {
                    name: this.name,
                    type: this.type,
                    step: this.step,
                    min: this.min,
                    max: this.max,
                    class: this._class,
                    'data-vv-as': this.vvAs
                },
                directives: [
                    {
                        name: 'validate',
                        value: this.validation
                    }
                ],
                props,
                on: {
                    input: value => self.fireInputEvent(value),
                    blur: () => self.$emit('blur'),
                    focus: () => self.$emit('focus'),
                    'update:error': value => self.$emit('update:error', value),
                    'click:clear': () => self.$emit('click:clear')
                }
            });
        }
    }

</script>
