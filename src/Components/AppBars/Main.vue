<template>
    <v-app-bar :app="app" clipped-left clipped-right>
        <v-app-bar-nav-icon @click.stop="toggleNavigationDrawer" class="hidden-lg-and-up"
                            v-if="navigationDrawer" aria-label="Toggle sidebar">
        </v-app-bar-nav-icon>
        <v-toolbar-title v-if="showingTitle" class="mr-3">
            <router-link :to="toolbarTitleRedirectUrl" v-if="!!$slots['title']">
                <slot name="title"></slot>
            </router-link>
            <router-link :to="toolbarTitleRedirectUrl" v-if="title && title.length">
                {{ title }}
            </router-link>
        </v-toolbar-title>
        <slot name="toolbar-text" v-show="showingTitle">
            <breadcrumbs-main :items="breadcrumbs"></breadcrumbs-main>
        </slot>
        <v-spacer></v-spacer>
        <slot name="toolbar-text-right" v-show="showingTitle"></slot>
        <text-field-search v-model="searchQuery" v-show="showingSearch" @click:clear="hideSearch"
                           @blur="hideSearchIfEmpty">
        </text-field-search>
        <v-btn icon @click="showSearch" v-if="search || searchCallback" v-show="!showingSearch">
            <v-icon>search</v-icon>
        </v-btn>
        <slot name="toolbar" v-show="!showingSearch"></slot>
        <v-toolbar-items>
            <slot name="toolbar-items"></slot>
        </v-toolbar-items>
        <template #extension v-if="extended">
            <slot name="tabs"></slot>
        </template>
    </v-app-bar>
</template>

<script lang="ts">

    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import { Config }                      from '../../Config';
    import { BreadcrumbsMain }             from '../Breadcrumbs/Main.vue';
    import { TextFieldSearch }             from '../TextFields/Search.vue';

    @Component({
        components: {
            BreadcrumbsMain,
            TextFieldSearch
        }
    })
    export class AppBarMain extends Vue
    {
        /**
         * Designates the component as part of the application layout. Used for dynamically
         * adjusting content sizing. Components using this prop should reside outside of v-content
         * component to function properly. You can more information about layouts on the application
         * page.
         */
        @Prop({ type: Boolean, default: false }) app: boolean;

        /**
         * Make the app bar extended.
         */
        @Prop({ type: Boolean, default: false }) extended: boolean;

        /**
         * Whether or not the search button should be displayed.
         */
        @Prop({type: Boolean, default: false}) search: boolean;

        /**
         * Whether or not there is a navigation drawer. If there isn't one (false) the app bar nav
         * icon is hidden.
         */
        @Prop({type: Boolean, default: true}) navigationDrawer: boolean;

        /**
         * Toolbar title.
         */
        @Prop({type: String, default: Config.app.name}) title: string;

        /**
         * Toolbar title link.
         */
        @Prop({type: String, default: ''}) titleTo: string;

        protected showingSearch: boolean = false;

        protected searchQuery: string | (string | null)[] = '';

        get breadcrumbs(): Array<any>
        {
            return this.$store.getters.app.ui.toolbar.breadcrumbs;
        }

        get searchCallback(): Function | null
        {
            return this.$store.getters.app.ui.search;
        }

        get showingTitle(): boolean
        {
            if (this.$vuetify.breakpoint.xs) {
                return false;
            }

            if (this.$vuetify.breakpoint.mdAndUp) {
                return !!(!!this.$slots.title || (this.title && this.title.length))
            } else {
                return !(this.showingSearch && window.innerWidth <= 576);
            }
        }

        get toolbarTitleRedirectUrl(): string
        {
            if (this.titleTo.length) {
                return this.titleTo;
            }

            return (this.user.id) ? '/home' : '/';
        }

        get ui(): any
        {
            return this.$store.getters.app.ui;
        }

        get user(): any
        {
            return this.$store.getters.app.user;
        }

        /**
         * Hide the search box.
         */
        hideSearch(): void
        {
            this.showingSearch = false;
            this.searchQuery = '';
        }

        /**
         * Hide the search box if it's empty.
         */
        hideSearchIfEmpty(): void
        {
            if (! this.searchQuery || this.searchQuery.length === 0) {
                this.hideSearch();
            }
        }

        /**
         * Show the search box.
         */
        showSearch(): void
        {
            this.showingSearch = true;

            setTimeout(() => {
                let input = this.$el.querySelector('input');
                if (input) {
                    input.focus();
                }
            });
        }

        /**
         * Expand the navigationDrawer.
         */
        toggleNavigationDrawer(): void
        {
            this.$store.commit(
                'ui/SET_NAVIGATION_DRAWER_VISIBILITY',
                ! this.ui.navigationDrawerVisible
            );
        }

        mounted(): void
        {
            this.searchQuery = this.$route.query.search;

            if (this.searchQuery) {
                this.showSearch();
            }
        }

        @Watch('searchQuery')
        onSearchQueryChanged(): void
        {
            if (this.searchCallback) {
                this.searchCallback(this.searchQuery);
            }
        }
    }

    export default AppBarMain;

</script>
