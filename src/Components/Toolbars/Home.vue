<template>
    <toolbar-main fixed :title="title" :search="search" :search-subject="searchSubject"
                  :tabs="tabs" :title-to="titleTo" @search:update="bubbleSearchUpdateEvent">
        <template #title>
            <slot name="title"></slot>
        </template>
        <template #toolbar-text>
            <slot name="toolbar-text"></slot>
        </template>
        <template #toolbar-text-right>
           <slot name="toolbar-text-right"></slot>
        </template>
        <template #toolbar-items>
            <slot name="toolbar-items"></slot>
            <v-btn icon @click="toggleNotificationsDrawer">
                <v-badge color="red">
                    <span #badge v-if="unreadNotificationsCount">
                        {{ unreadNotificationsCount }}
                    </span>
                    <v-icon>notifications</v-icon>
                </v-badge>
            </v-btn>
        </template>
        <template #tabs>
            <slot name="tabs"></slot>
        </template>
    </toolbar-main>
</template>

<script lang="ts">

    import Vue from 'vue';

    export Vue.extend({

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
