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
            bubbleCancelledEvent(event)
            {
                this.$emit('cancel', event);
            },

            /**
             * Propagates the submitted form event to the parent.
             *
             * @param event
             */
            bubbleSubmittedEvent(event)
            {
                this.$emit('submitted', event)
            }
        }
    }

</script>
