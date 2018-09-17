<template>
    <v-toolbar :fixed="this.fixed" app clipped-left :color="color"
               clipped-right :tabs="tabs" :scroll-off-screen="$vuetify.breakpoint.mdAndDown">
        <v-toolbar-side-icon @click.stop="toggleNavigationDrawer" class="hidden-lg-and-up"
                             v-if="navigationDrawer">
        </v-toolbar-side-icon>
        <v-toolbar-title v-if="showingTitle && title.length" class="mr-3">
            <router-link :to="toolbarTitleRedirectUrl" v-if="!!$slots['title']">
                <slot name="title"></slot>
            </router-link>
            <router-link :to="toolbarTitleRedirectUrl" v-else="title">{{ title }}</router-link>
        </v-toolbar-title>
        <slot name="toolbar-text" v-show="showingTitle"></slot>
        <v-spacer v-if="showingTitle"></v-spacer>
        <slot name="toolbar-text-right" v-show="showingTitle"></slot>
        <text-field-search v-model="searchQuery" v-show="showingSearch" @click:clear="hideSearch"
                           @blur="hideSearchIfEmpty">
        </text-field-search>
        <v-btn icon @click="showSearch" v-if="search" v-show="!showingSearch">
            <v-icon>search</v-icon>
        </v-btn>
        <slot name="toolbar" v-show="!showingSearch"></slot>
        <v-toolbar-items>
            <slot name="toolbar-items"></slot>
        </v-toolbar-items>
        <slot name="tabs" slot="extension"></slot>
    </v-toolbar>
</template>

<script>

    import Config          from '../../Config';
    import TextFieldSearch from 'spa-skeleton/src/Components/TextFields/Search'

    export default {

        name: 'ToolbarMain',

        components: {
            TextFieldSearch
        },

        props: {

            /**
             * Toolbar's color.
             */
            color: {
                type: String,
                default: ''
            },

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
                type: String,
                default: () => Config.name
            },

            /**
             * Toolbar title link.
             */
            titleTo: {
                type: String,
                default: ''
            },

            /**
             * Display a toolbar with tabs.
             */
            tabs: {
                type: Boolean,
                default: false
            }
        },

        data()
        {
            return {
                showingSearch: false,
                searchQuery: '',
                mounted: false,
            }
        },

        computed: {

            toolbarTitleRedirectUrl()
            {
                if (this.titleTo.length) {
                    return this.titleTo;
                }

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
                this.searchQuery = '';
            },

            /**
             * Hide the search box if it's empty.
             */
            hideSearchIfEmpty()
            {
                if (!this.searchQuery || this.searchQuery.length === 0) {
                    this.hideSearch();
                }
            },

            /**
             * Show the search box.
             */
            showSearch()
            {
                this.showingSearch = true;

                setTimeout(() => this.$el.querySelector('input').focus());
            }
        },

        mounted()
        {
            let searchQuery = this.$route.query.search;

            if (this.search && searchQuery) {
                this.searchQuery = searchQuery;
                this.showSearch();
            }
        },

        watch: {

            searchQuery()
            {
                this.$emit('search:update', this.searchQuery);
            }
        }
    }

</script>
