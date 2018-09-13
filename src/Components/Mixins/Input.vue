<script>

    /**
     * This mixin can be used in order to create inputs.
     *
     * It is possible to override any of the value of the props by defining a computed value with
     * the same name.
     */
    export default {

        props: {

            /**
             * v-model
             */
            value: {},

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
             * Whether the input is disabled.
             */
            disabled: {
                default: false
            },

            /**
             * Input label.
             */
            label: {
                type: String,
                default: ''
            }
        },

        computed: {

            errorMessages()
            {
                let parentFormErrors = this.parentForm().errors.collect(this.name, 'server');

                // First we display the server errors if any...
                if (parentFormErrors.length) {
                    return parentFormErrors;
                }

                // ...and then the validation errors.
                return this.errors.collect(this.name);
            }
        },

        methods: {

            /**
             * Access the form containing the text field.
             */
            parentForm()
            {
                return this.$parent.$parent.$parent;
            }
        }
    }

</script>
