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
                subject: [],
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
            }
        },

        mounted()
        {
            this.searchSubject = this[this.subjectName];

            this.$watch(this.subjectName, () =>
            {
                this.searchSubject = this[this.subjectName];
            });

            this.$eh.$on('search-completed', this.searchCompleted);
        }
    }

</script>
