<script lang="ts">

    import { Component, Watch, Vue } from 'vue-property-decorator';
    import { Subscription } from '../../Library/Interfaces/Subscription';

    /**
     * Use this mixin to make a component subscribe to certain events.
     */
    @Component
    export class Subscribable extends Vue
    {
        /**
         * Override this in order to define the subscriptions.
         */
        subscriptions: Subscription[] = [];

        @Watch('subscriptions', { immediate: true })
        onSubscriptionsChange(): void
        {
            if (! this.subscriptions.length) {
                return;
            }

            this.$ws.listen(this.subscriptions);
        }

        beforeDestroy(): void
        {
            this.$ws.silence(this.subscriptions);
        }
    }

    export default Subscribable;

</script>
