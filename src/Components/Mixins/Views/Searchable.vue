<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component
    export default class Searchable extends Vue
    {
        timeout: NodeJS.Timeout;

        /**
         * Perform a server-side search.
         */
        search(subject: string)
        {
            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() =>
            {
                let query = {
                    ...this.$route.query,
                    search: subject
                };

                if (!subject) {
                    delete query['search'];
                }

                this.$router.push({
                    path: this.$route.path,
                    query
                });
            }, 500)
        }
    }

</script>
