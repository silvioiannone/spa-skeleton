<script lang="ts">

    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export class Searchable extends Vue
    {
        timeout: NodeJS.Timeout;

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

        mounted(): void
        {
            this.$store.commit('app/SET', {
                key: 'ui.search',
                value: this.search
            });
        }

        beforeDestroy(): void
        {
            this.$store.commit('app/SET', {
                key: 'ui.search',
                value: null
            });
        }
    }

    export default Searchable;

</script>
