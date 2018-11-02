<script>

    /*
     * This mixin is intented to be used with cards holding forms.
     */
    export default {

        methods: {

            /**
             * Propagates the cancel form event to the parent.
             *
             * @param event
             */
            bubbleCancelEvent(event)
            {
                this.$emit('cancel', event);
            },

            /**
             * Propagates the submit form event to the parent.
             *
             * @param event
             */
            bubbleSubmitEvent(event)
            {
                this.$emit('submit', event)
            }
        }
    }

</script>
