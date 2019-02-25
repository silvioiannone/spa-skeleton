<script lang="ts">

    import Vue              from 'vue';
    import { Component }    from 'vue-property-decorator';
    import { Subscription } from '../../Library/Interfaces/Subscription';

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
