<script lang="ts">

import { Route } from 'vue-router';

import '../../../Library/ComponentHooks';

interface Head {
    title?: null | string,
    description?: null | string
}

export default {

    data()
    {
        return {
            head: {
                title: null,
                description: null
            } as Head
        }
    },

    methods: {
        /**
         * Refresh the head tag's content.
         */
        refreshHead(): void
        {
            this.setTitle();
            this.setDescription();
        },

        /**
         * Set the head description.
         */
        setDescription(): void
        {
            if (this.head.description) {
                this.$head.description(this.head.description);
            }
        },

        /**
         * Set the head title.
         */
        setTitle(): void
        {
            if (this.head.title) {
                this.$head.title(this.head.title);
            }
        }
    },

    beforeRouteEnter(to: Route, from: Route, next: Function) {
        next((vm: Headful) => {
            vm.refreshHead();
        });
    },

    beforeRouteUpdate(to: Route, from: Route, next: Function) {
        this.refreshHead();
        next();
    },

    watch: {
        head()
        {
            this.refreshHead();
        }
    }
}

</script>
