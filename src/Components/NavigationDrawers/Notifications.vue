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
        <template v-if="unreadNotifications.length">
            <v-list two-line >
                <slot :unread-notifications="unreadNotifications"></slot>
            </v-list>
            <slot name="outer" :unread-notifications="unreadNotifications"></slot>
        </template>
        <v-container class="mt-4" v-else>
            <v-layout wrap>
                <v-flex class="text-center" xs12>
                    <v-icon x-large>notifications_none</v-icon>
                </v-flex>
                <v-flex xs12>
                    <v-divider class="my-3"></v-divider>
                </v-flex>
                <v-flex class="text-center" xs12>
                    <p>{{ $t('navigationDrawer.noNewNotifications') }}</p>
                </v-flex>
            </v-layout>
        </v-container>
        <v-list class="navigation-drawer--bottom">
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item-title>Desktop notifications</v-list-item-title>
                    <v-list-item-subtitle>
                        If authorization was denied it needs to be manually re-enabled in the
                        browser.
                    </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                    <v-switch v-model="desktopNotifications" inset
                              @change="enableDesktopNotifications">
                    </v-switch>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">

    import { ResponseInterface, Notification } from 'spa-skeleton';
    import { Vue, Component }                  from 'vue-property-decorator';
    import _                                   from 'lodash';
    import PushJS                              from 'push.js';

    @Component
    export class NavigationDrawerNotifications extends Vue
    {
        get notifications(): any[]
        {
            return Notification.all();
        }

        get unreadNotifications(): any[]
        {
            return this.notifications
                .filter((notification: any) => notification.read_at === null)
        }

        get visible(): boolean
        {
            return this.$store.getters.app.ui.navigationDrawers.notificationsVisible;
        }

        set visible(value)
        {
            this.$store.commit('ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY', value);
        }

        get desktopNotifications(): boolean
        {
            return _.get(
                this.$store.getters.app,
                'user.settings.notifications.desktopNotifications'
            ) || false;
        }

        set desktopNotifications(value: boolean)
        {
            this.$store.commit('user/CHANGE_SETTING', {
                notifications: {
                    desktopNotifications: value
                }
            });
        }

        /**
         * Enable the desktop notifications.
         */
        enableDesktopNotifications(enable: boolean): void
        {
            let user = this.$store.getters.app.user;

            if (enable) {
                if (! PushJS.Permission.has()) {
                    PushJS.Permission.request(() => {
                        this.desktopNotifications = true;
                        this.$api.users.update({
                            id: user.id,
                            settings: user.settings
                        });
                    }, () => {
                        setTimeout(() => {
                            this.desktopNotifications = false;
                        });
                    });
                } else {
                    this.desktopNotifications = true;
                    this.$api.users.update({
                        id: user.id,
                        settings: user.settings
                    });
                }
            } else {
                this.desktopNotifications = false;
                this.$api.users.update({
                    id: user.id,
                    settings: user.settings
                });
            }
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
                            Notification.create({data: []});
                        });
                });
        }
    }

    export default NavigationDrawerNotifications;

</script>
