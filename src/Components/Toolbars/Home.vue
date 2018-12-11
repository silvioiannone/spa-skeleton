<template>
    <toolbar-main fixed :title="title" :search="search" :search-subject="searchSubject"
                  :tabs="tabs" :title-to="titleTo" @search:update="bubbleSearchUpdateEvent">
        <slot slot="title" name="title"></slot>
        <slot slot="toolbar-text" name="toolbar-text"></slot>
        <slot slot="toolbar-text-right" name="toolbar-text-right"></slot>
        <slot slot="toolbar-items" name="toolbar-items"></slot>
        <template slot="toolbar-items">
            <v-btn icon @click="toggleNotificationsDrawer">
                <v-badge color="red">
                    <span slot="badge" v-if="unreadNotificationsCount">
                        {{ unreadNotificationsCount }}
                    </span>
                    <v-icon>notifications</v-icon>
                </v-badge>
            </v-btn>
        </template>
        <slot slot="tabs" name="tabs"></slot>
    </toolbar-main>
</template>

<script lang="ts">

    import Vue from 'vue';

    export default Vue.extend({

        name : 'ToolbarHome',

        props: {

            /**
             * For info about these parameters look at the ToolbarMain component.
             */
            search: {},
            searchSubject: {},
            title: {},

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
            },

            /*
             * Whether or not we're showing the search bar.
             */
            showingSearch: {
                type: Boolean,
                default: false
            }
        },

        computed: {

            user(): number
            {
                return this.$store.getters.app.user;
            },

            unreadNotificationsCount(): number
            {
                return this.$store.getters.notifications
                    .filter((notification: any) => notification.read_at === null)
                    .length;
            }
        },

        methods: {

            /**
             * Toggle the notifications drawer.
             */
            toggleNotificationsDrawer(): void
            {
                let visibility = this.$store.getters.ui.notificationsDrawerVisible;

                this.$store.commit('ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY', !visibility);
            },

            /**
             * Bubble the `search:update` event.
             */
            bubbleSearchUpdateEvent(payload: any): void
            {
                this.$emit('search:update', payload)
            }
        }
    });

</script>
