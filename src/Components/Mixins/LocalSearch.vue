<script>

    /*
     * This mixin is useful when the view needs to perform and react to users performing some local
     * searches.
     *
     * Usage:
     *
     * The only thing you need to do is to assign the name of the property that will be searched:
     *
     *     data()
     *     {
     *         return {
     *             subjectName: 'tasks'
     *         }
     *     }
     */
    export default
    {
        data()
        {
            return {
                searchSubject: [],
                subjectName: ''
            }
        },

        methods: {

            /**
             * Handle a completed search.
             */
            searchCompleted(subject)
            {
                this.searchSubject = subject;

                // Hack to make the Vue Virtual Scroll display the correct number of elements after
                // a search has been completed with no results returned (for some reason it only
                // displays the first 3 items).
                setTimeout(() => window.dispatchEvent(new Event('resize')));
            }
        },

        mounted()
        {
            this.$eh.$on('search-completed', this.searchCompleted);
        },

        watch: {

            tasks()
            {
                this.searchSubject = this[this.subjectName];
            }
        },

        mounted()
        {
            this.searchSubject = this[this.subjectName];
        }
    }

</script>
