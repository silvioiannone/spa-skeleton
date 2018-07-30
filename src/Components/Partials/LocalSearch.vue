<template>
    <text-field-search></text-field-search>
</template>

<script>

    import Objects from '../../Library/Utils/Objects';
    import TextFieldSearch from 'spa-skeleton/src/Components/TextFields/Search';

    export default {

        name: 'PartialLocalSearch',

        components: {
            TextFieldSearch
        },

        props: {

            /**
             * An array that contains the object that will be searched.
             */
            subject: {
                required: true,
                type: Array
            },

            /**
             * Return the result in a reversed order when search string is
             * empty.
             *
             * Useful for masonry grids.
             */
            reversed: {
                type: Boolean
            }
        },

        data()
        {
            return {

                /**
                 * Will hold the object keys.
                 */
                keys: [],

                /**
                 * What to search for.
                 */
                searchString: null,

                /**
                 * Keep track of whether there's an already pending search.
                 */
                searchPending: false
            }
        },

        methods:
        {
            /**
             * Executes a search.
             */
            search()
            {
                if(!this.searchString)
                {
                    this.$eh.$emit('search-completed', this.subject);

                    return;
                }

                if(this.searchPending) return;

                this.searchPending = true;

                setTimeout(() =>
                {
                    this.$eh.$emit(
                        'search-completed',
                        Objects.search(this.searchString, this.subject)
                    );
                    this.searchPending = false;
                }, 1000);
            }
        },

        beforeDestroy()
        {
            this.$eh.$emit('search-completed', this.subject);
        },

        watch:
        {
            'searchString'()
            {
                this.search();
            },

            'subject'()
            {
                // Store the keys so that we don't calculate them again.
                try
                {
                    this.keys = Object.keys(this.subject[0]);
                }
                catch (err){}

                this.search();
            }
        }
    }

</script>
