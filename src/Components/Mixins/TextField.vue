<script>

    /**
     * This mixin can be used in order to create text fields.
     *
     * It is possible to override any of the value of the props by defining a computed value with
     * the same name.
     */
    export default {

        props: {

            /**
             * Label.
             */
            label: {
                type: String,
                default: ''
            },

            /**
             * A hint displayed under the text field.
             */
            hint: {
                type: String,
                default: ''
            },

            /**
             * Make the hint always visible.
             */
            persistentHint: {
                type: Boolean,
                default: false
            },

            /**
             * Make the phone input required.
             */
            required: {
                type: Boolean,
                default: true
            },

            /**
             * Value of the data-vv-name attribute.
             */
            dataVvName: {
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
             * Model value.
             */
            value: {
                default: ''
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
             * This can be overridden in order to modify the value passed to the `v-text-field`.
             */
            _value()
            {
                return this.value;
            },

            errorMessages()
            {
                let parentFormErrors = this.parentForm().errors.collect(this.dataVvName, 'server');

                // First we display the server errors if any...
                if (parentFormErrors.length) {
                    return parentFormErrors;
                }

                // ...and then the validation errors.
                return this.errors.collect(this.dataVvName);
            }
        },

        methods: {

            /**
             * Access the form containing the text field.
             */
            parentForm()
            {
                return this.$parent.$parent.$parent;
            },

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
            }
        },

        mounted()
        {
            // This is a work-around needed in order to prevent Vuetify text-input mask to trigger
            // the validation too soon.
            let phoneInput = this.$el.querySelector('input');
            phoneInput.addEventListener('focus', () =>
            {
                this.isFocused = true;
            });
            phoneInput.addEventListener('blur', () =>
            {
                this.isFocused = false;
            });
        },

        watch: {

            value()
            {
                this.$nextTick(() => this.$validator.validateAll());
            }
        },

        render(createElement)
        {
            let self = this;

            let props = Object.assign({}, this.$props, {
                errorMessages: this.errorMessages,
                prefix: this.isFocused || (this._value && this._value.length) ? this.prefix : '',
                mask: this.isFocused || (this._value && this._value.length) ? this.mask : '',
                value: this._value
            });

            return createElement('v-text-field', {
                attrs: {
                    'data-vv-name': this.dataVvName,
                    type: this.type,
                    step: this.step,
                    min: this.min,
                    max: this.max
                },
                directives: [
                    {
                        name: 'validate',
                        value: this.validation
                    }
                ],
                props,
                on: {
                    input: value => {
                        self.fireInputEvent(value);

                        // If the validation is successful remove the errors from the parent form.
                        this.$nextTick(() =>
                        {
                            this.parentForm().$validator.errors.remove(this.dataVvName);
                        });
                    },
                    blur: () => self.$emit('blur'),
                    focus: () => self.$emit('focus'),
                    'update:error': value => {
                        this.parentForm().$validator.errors.remove(this.dataVvName);

                        if (value) {
                            this.$validator.errors.items.forEach(error =>
                            {
                                this.parentForm().$validator.errors.add(error);
                            });
                        }
                        self.$emit('update:error', value)
                    }
                }
            });
        }
    }

</script>
