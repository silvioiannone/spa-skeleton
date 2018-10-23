<script>

    export default {

        props: {

            /**
             * Adds remove button.
             */
            close: {
                type: Boolean,
                default: false
            },

            /**
             * Removes circle edges.
             */
            label: {
                type: Boolean,
                default: false
            },

            /**
             * Removes background and applies border and text color.
             */
            outline: {
                type: Boolean,
                default: false
            },

            /**
             * Decreases the chip size.
             */
            small: {
                type: Boolean,
                default: false
            },

            /**
             * Applies specified color to the control - it can be the name of material color (for
             * example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`).
             */
            color: {
                type: String
            }
        }
    }

</script>
