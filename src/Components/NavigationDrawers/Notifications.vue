<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" right app fixed width="450"
                         temporary>
        <v-toolbar class="elevation-0">
            <v-toolbar-title>{{ $t('navigationDrawer.notifications') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <v-btn icon slot="activator" @click="markAllAsRead">
                    <v-icon>done_all</v-icon>
                </v-btn>
                <span>{{ $t('navigationDrawer.markAllAsRead') }}</span>
            </v-tooltip>
            <v-tooltip bottom>
                <v-btn icon slot="activator" @click="visible = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <span>{{ $t('navigationDrawer.close') }}</span>
            </v-tooltip>
        </v-toolbar>
        <v-list two-line v-if="unreadNotifications.length">
            <slot :unread-notifications="unreadNotifications"></slot>
        </v-list>
        <v-container class="mt-4" v-else>
            <v-layout wrap>
                <v-flex class="text-xs-center" xs12>
                    <v-icon x-large>notifications_none</v-icon>
                </v-flex>
                <v-flex xs12>
                    <v-divider class="my-3"></v-divider>
                </v-flex>
                <v-flex class="text-xs-center" xs12>
                    <p>{{ $t('navigationDrawer.noNewNotifications') }}</p>
                </v-flex>
            </v-layout>
        </v-container>
    </v-navigation-drawer>
</template>

<script>

    export default {

        name: 'NavigationDrawerNotifications',

        computed: {

            notifications()
            {
                return this.$store.getters.notifications;
            },

            unreadNotifications()
            {
                return this.notifications.filter(notification => notification.read_at === null)
            },

            visible: {
                get()
                {
                    return this.$store.getters.ui.notificationsDrawerVisible;
                },
                set(value)
                {
                    this.$store.commit('ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY', value);
                }
            }
        },

        methods: {

            /**
             * Mark all the notifications as read.
             */
            markAllAsRead()
            {
                this.$api.notifications.markAllAsRead()
                    .then(() =>
                    {
                        this.$api.users
                            .setParameters({
                                include: 'unread_notifications'
                            })
                            .find('me')
                            .then(response =>
                            {
                                this.$store.commit('notifications/STORE', {data: []});
                            });
                    });
            }
        }
    }

</script>
