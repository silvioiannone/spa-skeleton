<template>
    <v-toolbar :fixed="this.fixed" class="elevation-0" app clipped-left color="blue darken-3" dark
               :scroll-off-screen="$vuetify.breakpoint.mdAndDown" clipped-right>
        <v-toolbar-side-icon @click.stop="toggleNavigationDrawer" class="hidden-lg-and-up"
                             v-if="navigationDrawer">
        </v-toolbar-side-icon>
        <v-toolbar-title v-if="showingTitle" class="mr-3">
            <router-link :to="toolbarTitleRedirectUrl">{{ title }}</router-link>
        </v-toolbar-title>
        <slot name="toolbar-text" v-show="showingTitle"></slot>
        <v-spacer v-if="showingTitle"></v-spacer>
        <partial-local-search :subject="searchSubject" v-if="showingSearch">
        </partial-local-search>
        <v-btn icon @click="hideSearch" v-show="showingSearch">
            <v-icon>close</v-icon>
        </v-btn>
        <v-btn icon @click="showSearch" v-if="search" v-show="!showingSearch">
            <v-icon>search</v-icon>
        </v-btn>
        <slot name="toolbar" v-show="!showingSearch"></slot>
        <v-toolbar-items>
            <slot name="toolbar-items"></slot>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>

    import Config             from '../../Config';
    import PartialLocalSearch from '../Partials/LocalSearch.vue';

    export default
    {
        name: 'ToolbarMain',

        components: {
            PartialLocalSearch
        },

        props: {

            /**
             * Whether the toolbar should be fixed.
             */
            fixed: {
                type: Boolean,
                default: true
            },

            /**
             * Whether or not the search button should be displayed.
             */
            search: {
                type: Boolean,
                default: false
            },

            /**
             * The subject of the search.
             */
            searchSubject: {
                type: Array,
                default: () => []
            },

            /**
             * Whether or not there is a navigationDrawer. If there is no navigationDrawer (false)
             * the navigationDrawer menu icon is hidden.
             */
            navigationDrawer: {
                type: Boolean,
                default: true
            },

            /**
             * Toolbar title.
             */
            title: {
                Type: String,
                default: () => Config.name
            }
        },

        data()
        {
            return {
                showingSearch: false,
                _searchSubject: [],
                mounted: false,
            }
        },

        computed: {

            toolbarTitleRedirectUrl()
            {
                return (this.user.id) ? '/home' : '/';
            },

            showingTitle()
            {
                return !(this.showingSearch && window.innerWidth <= 576);
            },

            ui()
            {
                return this.$store.getters.ui;
            },

            user()
            {
                return this.$store.getters.app.user;
            }
        },

        methods: {

            /**
             * Expand the navigationDrawer.
             */
            toggleNavigationDrawer()
            {
                this.$store.commit('ui/SET_NAVIGATION_DRAWER_VISIBILITY', !this.ui.navigationDrawerVisible);
            },

            /**
             * Hide the search box.
             */
            hideSearch()
            {
                this.showingSearch = false;
            },

            /**
             * Show the search box.
             */
            showSearch()
            {
                this.showingSearch = true;

                setTimeout(() =>
                {
                    this.$el.querySelector('input').focus();
                })
            }
        }
    }

</script>
