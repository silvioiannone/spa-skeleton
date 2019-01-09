<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component
    export default class Form extends Vue
    {
        /**
         * Propagates the cancel form event to the parent.
         */
        bubbleCancelEvent(event: Event)
        {
            this.$emit('cancel', event);
        }

        /**
         * Propagates the submit form event to the parent.
         */
        bubbleSubmitEvent(event: Event)
        {
            this.$emit('submit', event)
        }
    }

</script>
