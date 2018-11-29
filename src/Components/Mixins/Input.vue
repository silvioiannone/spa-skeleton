<script>

    import Component from './Component';

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
            },

            /**
             * Puts the input in an error state and passes through custom error messsages. Will be
             * combined with any validations that occur from the rules prop. This field will not
             * trigger validation.
             */
            errorMessages: {
                type: Array,
                default: () => []
            }
        },

        computed: {

            _errorMessages()
            {
                return [...this.errorMessages, ...this.errors.collect(this.name)];
            }
        }
    }

</script>
