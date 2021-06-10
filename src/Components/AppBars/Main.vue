<template>
    <v-app-bar :app="app" clipped-left clipped-right elevate-on-scroll>
        <v-app-bar-nav-icon @click.stop="toggleNavigationDrawer" class="hidden-lg-and-up"
                            v-if="navigationDrawer" aria-label="Toggle sidebar"/>
        <v-toolbar-title v-if="showingTitle" class="mr-3">
            <router-link :to="toolbarTitleRedirectUrl" v-if="!!$slots['title']">
                <slot name="title"/>
            </router-link>
            <router-link v-else :to="toolbarTitleRedirectUrl">{{ title }}</router-link>
        </v-toolbar-title>
        <slot name="toolbar-text" v-if="showingBreadcrumbs">
            <breadcrumbs-main :items="breadcrumbs"/>
        </slot>
        <v-spacer/>
        <slot name="toolbar-text-right" v-if="showingTitle"/>
        <text-field-search v-if="showingSearch" v-model="routeSearchParameter"
                           @click:clear="hideSearch" @blur="hideSearchIfEmpty"/>
        <v-btn icon @click="showSearch" v-if="search || searchCallback" v-show="!showingSearch">
            <v-icon>search</v-icon>
        </v-btn>
        <slot name="toolbar" v-show="!showingSearch"/>
        <v-toolbar-items>
            <slot name="toolbar-items"/>
        </v-toolbar-items>
        <template #extension v-if="extended">
            <slot name="tabs"/>
        </template>
        <v-progress-linear absolute bottom :active="status === 'loading'"
                           :indeterminate="status === 'loading'"/>
    </v-app-bar>
</template>

<script lang="ts">

    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import { Config }                      from '../../Config';
    import BreadcrumbsMain from '../Breadcrumbs/Main.vue';
    import TextFieldSearch from '../TextFields/Search.vue';

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
         * adjusting content sizing. Components using this prop should reside outside of v-main
         * component to function properly. You can more information about layouts on the application
         * page.
         */
        @Prop({ type: Boolean, default: false }) app: boolean;

        /**
         * Make the app bar extended.
         */
        @Prop({ type: Boolean, default: false }) extended: boolean;

        /**
         * Whether the search button should be displayed.
         */
        @Prop({ type: Boolean, default: false }) search: boolean;

        /**
         * Whether there is a navigation drawer.
         *
         * If there isn't one (false) the app bar nav icon is hidden.
         */
        @Prop({ type: Boolean, default: true }) navigationDrawer: boolean;

        /**
         * Toolbar title.
         */
        @Prop({ type: String, default: Config.app.name }) title: string;

        /**
         * Toolbar title link.
         */
        @Prop({ type: String, default: '' }) titleTo: string;

        protected showingSearch: boolean = false;

        get status(): any
        {
            return this.$store.getters.app.status;
        }

        get breadcrumbs(): Array<any>
        {
            return this.ui.toolbar.breadcrumbs;
        }

        get routeSearchParameter(): string | undefined
        {
            return this.$route.query.search as (string | undefined);
        }

        set routeSearchParameter(value: string | undefined)
        {
            if (! this.searchCallback) {
                return;
            }

            this.searchCallback(value);
        }

        get searchCallback(): Function | null
        {
            return this.ui.search;
        }

        get showingBreadcrumbs(): boolean
        {
            return this.$vuetify.breakpoint.smAndDown ? !this.showingSearch : true;
        }

        get showingTitle(): boolean
        {
            if (this.$vuetify.breakpoint.smAndDown) {
                return false;
            }

            if (this.$vuetify.breakpoint.mdAndUp) {
                return !!(!!this.$slots.title || (this.title && this.title.length))
            }

            return true;
        }

        get toolbarTitleRedirectUrl(): string
        {
            if (this.titleTo.length) {
                return this.titleTo;
            }

            return (this.$user.id) ? '/home' : '/';
        }

        get ui(): any
        {
            return this.$store.getters.app.ui;
        }

        /**
         * Hide the search box.
         */
        hideSearch(): void
        {
            this.routeSearchParameter = '';
            this.showingSearch = false;
        }

        /**
         * Hide the search box if it's empty.
         */
        hideSearchIfEmpty(): void
        {
            if (! this.routeSearchParameter?.length) {
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
                ! this.ui.navigationDrawers.leftVisible
            );
        }

        @Watch('routeSearchParameter', { immediate: true })
        onRouteSearchParameterChange(): void
        {
            if (this.routeSearchParameter?.length) {
                this.showSearch();
            }
        }

        @Watch('searchCallback')
        onSearchCallbackChange(): void
        {
            if (! this.searchCallback) {
                this.hideSearch();
            }
        }
    }

    export default AppBarMain;

</script>
