<template>
    <toolbar-main fixed :title="title" :search="search" :search-subject="searchSubject">
        <slot slot="title" name="title"></slot>
        <slot slot="toolbar-text" name="toolbar-text"></slot>
        <slot slot="toolbar-text-right" name="toolbar-text-right"></slot>
        <template slot="toolbar">
            <slot name="toolbar"></slot>
            <v-btn icon @click="toggleNotificationsDrawer">
                <v-badge color="red">
                    <span slot="badge" v-if="unreadNotificationsCount">
                        {{ unreadNotificationsCount }}
                    </span>
                    <v-icon>notifications</v-icon>
                </v-badge>
            </v-btn>
        </template>
    </toolbar-main>
</template>

<script>

    import NotificationHandler from 'assets/js/App/Notifications/Handler';

    export default {

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

        computed: {

            user()
            {
                return this.$store.getters.app.user;
            },

            unreadNotificationsCount()
            {
                return this.$store.getters.notifications.filter(notification =>
                {
                    let handler = NotificationHandler[notification.type];
                    if (handler) {
                        (new handler(this)).handle(notification);
                    }

                    return notification.read_at === null
                })
                    .length;
            }
        },

        methods: {

            /**
             * Toggle the notifications drawer.
             */
            toggleNotificationsDrawer()
            {
                let visibility = this.$store.getters.ui.notificationsDrawerVisible;

                this.$store.commit('ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY', !visibility);
            }
        }
    }

</script>
