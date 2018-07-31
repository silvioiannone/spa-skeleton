<script>

    let timeout = null;

    export default {

        methods: {

            /**
             * Perform a server-side search.
             *
             * @param subject
             */
            search(subject)
            {
                if (timeout) {
                    clearTimeout(timeout);
                }

                timeout = setTimeout(() =>
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
    }

</script>
