<template>
    <v-list-item @click="handleClick">
        <v-list-item-avatar>
            <v-icon>arrow_back</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
                <template v-if="canGoBack">{{ $t('common.back') | capitalize }}</template>
                <template v-else-if="! canGoBack && title.length">
                    {{ title | capitalize }}
                </template>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { Route } from 'vue-router';

    @Component
    export class ListItemBack extends Vue
    {
        /**
         * Highlight the list item only if the route matches exactly.
         */
        @Prop({ type: Boolean, default: true }) exact: boolean;

        /**
         * Title displayed by the card.
         */
        @Prop({ type: String, default: '' }) title: string;

        /**
         * Link destination.
         */
        @Prop({ type: String, default: '' }) to: string;

        get canGoBack(): boolean
        {
            return !! this.lastVisitableView;
        }

        get previousRoutes(): Route[]
        {
            return this.$store.getters.app.router.history;
        }

        get lastVisitableView(): Route | undefined
        {
            // We need to work on a copy of the `previousRoutes` otherwise `reverse()` will change
            // the order of the previous routes.
            return [...this.previousRoutes].reverse()
                .find((route: Route): boolean => {
                    // Skip the root route.
                    if (route.path === '/') {
                        return false;
                    }

                    // Skip sibling routes.
                    return ! this.routeIsSibling(route);
                });
        }

        /**
         * Whether the given route is a sibling of the current route.
         */
        routeIsSibling(route: Route): boolean
        {
            let pieces = this.$route.path.split('/');

            let parent = pieces.slice(0, pieces.length - 1)
                .join('/');

            return route.path.startsWith(parent) && route.path.length > parent.length;
        }

        /**
         * Handle the click on the button.
         */
        handleClick(): void
        {
            if (this.canGoBack && this.lastVisitableView) {
                this.$navigator.push({
                    path: this.lastVisitableView.path,
                    query: this.lastVisitableView.query
                });
                return;
            }

            this.$navigator.push(this.to);
        }
    }

    export default ListItemBack;

</script>
