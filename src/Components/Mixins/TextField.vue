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
             * Model value.
             */
            value: {}
        },

        computed: {

            errorMessages()
            {
                return this.errors.collect(this.dataVvName);
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
            }
        },

        watch: {

            value(newValue, oldValue)
            {
                this.$nextTick(() => this.$validator.validateAll());
            }
        },

        render(createElement)
        {
            let self = this;

            let props = Object.assign({}, this.$props, {
                errorMessages: this.errorMessages
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
                    input: value => self.fireInputEvent(value),
                    blur: () => self.$emit('blur'),
                    focus: () => self.$emit('focus'),
                    'update:error': value => {
                        let formContainer = this.$parent.$parent.$parent;
                        formContainer.$validator.errors.remove(this.dataVvName);

                        if (value) {
                            // Take the error and assign it to the parent validator.
                            // The first parent is VForm.
                            // The second parent is FormMain.
                            // The third parent is the actual form container component.
                            this.$validator.errors.items.forEach(error =>
                            {
                                formContainer.$validator.errors.add(error);
                            });
                        }
                        self.$emit('update:error')
                    }
                }
            });
        }
    }

</script>
