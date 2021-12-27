<script lang="ts">

export default {

    data() {
        return {
            timeout: undefined as NodeJS.Timeout
        }
    },

    methods: {
        /**
         * Perform a server-side search.
         */
        search(subject: string | undefined)
        {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() => {
                // If the search subject is empty, and the route params doesn't have any search
                // parameter don't perform the navigation.
                if ((! subject || ! subject.length) && ! this.$route.query.search) {
                    return;
                }

                let query = {
                    ...this.$route.query,
                    search: subject,
                    page: 1
                };

                if (! subject) {
                    delete query['search'];
                }

                this.$navigator.push({ path: this.$route.path, query });
            }, 500)
        }
    },

    mounted(): void
    {
        this.$store.commit('app/SET', {
            key: 'ui.search',
            value: this.search
        });
    },

    beforeDestroy(): void
    {
        this.$store.commit('app/SET', {
            key: 'ui.search',
            value: null
        });
    }
}

</script>
