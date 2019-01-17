<script lang="ts">

    import Vue             from 'vue';
    import { Component }   from 'vue-property-decorator';
    import AbstractChannel from '../../Library/WebSocket/AbstractChannel';
    import AbstractHandler from '../../Library/Events/AbstractHandler';

    interface Subscription {
        event: string,
        channels: Array<AbstractChannel | typeof AbstractChannel>,
        handlers?: Array<typeof AbstractHandler>
    }

    /**
     * Use this mixin to make a component subscribe to certain events.
     */
    @Component
    export default class Subscribable extends Vue
    {
        /**
         * Override this in order to define the subscriptions.
         */
        subscriptions: Array<Subscription> = [];

        created()
        {
            this.$ws.listen(this.subscriptions);
        }

        beforeDestroy()
        {
            this.$ws.silence(this.subscriptions);
        }
    }

</script>
