<template>
    <toolbar-main fixed :title="title" :search="search" :search-subject="searchSubject">
        <template slot="title">
            <slot name="title"></slot>
        </template>
        <template slot="toolbar">
            <slot name="toolbar" v-show="!showingSearch"></slot>
        </template>
    </toolbar-main>
</template>

<script>

    export default
    {
        name : 'ToolbarHome',

        props: {

            /**
             * For info about these parameters look at the ToolbarMain component.
             */
            search: {},
            searchSubject: {},
            title: {},

            /*
             * Whether or not we're showing the search bar.
             */
            showingSearch: {
                type: Boolean,
                default: false
            }
        },

        computed:
        {
            user()
            {
                return this.$store.getters.app.user;
            }
        }
    }
</script>
