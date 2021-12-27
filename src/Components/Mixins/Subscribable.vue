<script lang="ts">

import { Subscription } from '../../Library/Interfaces/Subscription';

export default {

    data()
    {
        return {
            /**
             * Override this in order to define the subscriptions.
             */
            subscriptions: [] as Subscription[]
        }
    },

    created()
    {
        this.$watch('subscriptions', () => {
            if (! this.subscriptions.length) {
                return;
            }

            this.$ws.listen(this.subscriptions);
        }, { immediate: true });
    },

    beforeDestroy(): void
    {
        this.$ws.silence(this.subscriptions);
    }
}

</script>
