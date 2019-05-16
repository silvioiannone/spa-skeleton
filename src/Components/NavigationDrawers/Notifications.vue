<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" right app fixed width="450" temporary>
        <v-toolbar class="elevation-0">
            <v-toolbar-title>{{ $t('navigationDrawer.notifications') }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
                <template #activator="data">
                    <v-btn icon @click="markAllAsRead" v-on="data.on">
                        <v-icon>done_all</v-icon>
                    </v-btn>
                </template>
                <span>{{ $t('navigationDrawer.markAllAsRead') }}</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template #activator="data">
                    <v-btn icon @click="visible = false" v-on="data.on">
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>
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

<script lang="ts">

    import { ResponseInterface, Models } from 'spa-skeleton';
    import { Vue, Component }            from 'vue-property-decorator';

    @Component
    export class NavigationDrawerNotifications extends Vue
    {
        get notifications()
        {
            return Models.Notification.all();
        }

        get unreadNotifications()
        {
            return this.notifications.filter((notification: any) => notification.read_at === null)
        }

        get visible(): boolean
        {
            return this.$store.getters.app.ui.navigationDrawers.notificationsVisible;
        }

        set visible(value)
        {
            this.$store.commit('ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY', value);
        }

        /**
         * Mark all the notifications as read.
         */
        markAllAsRead(): void
        {
            this.$api.notifications.markAllAsRead()
                .then(() =>
                {
                    this.$api.users
                        .setParameters({
                            include: 'unread_notifications'
                        })
                        .find('me')
                        .then((response: ResponseInterface) =>
                        {
                            this.$store.commit('notifications/STORE', {data: []});
                        });
                });
        }
    }

    export default NavigationDrawerNotifications;

</script>
