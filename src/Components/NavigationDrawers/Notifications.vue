<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" right app fixed width="450" temporary>
        <v-toolbar class="elevation-0">
            <v-toolbar-title>{{ $t('navigationDrawer.notifications') }}</v-toolbar-title>
            <v-spacer/>
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
            <div class="navigation-drawer--notifications-container">
                <v-list two-line>
                    <slot :unread-notifications="unreadNotifications"/>
                </v-list>
                <slot name="outer" :unread-notifications="unreadNotifications"/>
            </div>
        </template>
        <v-container class="mt-4" v-else>
            <v-row>
                <v-col class="text-center" cols="12">
                    <v-icon x-large>notifications_none</v-icon>
                </v-col>
                <v-col cols="12">
                    <v-divider class="my-3"/>
                </v-col>
                <v-col class="text-center" cols="12">
                    <p>{{ $t('navigationDrawer.noNewNotifications') }}</p>
                </v-col>
            </v-row>
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
                              @change="enableDesktopNotifications"/>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">

import { ResponseInterface, Notification } from '../../index';
import _ from 'lodash';
import PushJS from 'push.js';

export default {

    name: 'NavigationDrawerNotifications',

    computed: {
        notifications(): any[]
        {
            return Notification.all();
        },

        unreadNotifications(): any[]
        {
            return this.notifications
                .filter((notification: any) => notification.read_at === null)
        },

        visible: {
            get(): boolean
            {
                return this.$store.getters.app.ui.navigationDrawers.notificationsVisible;
            },
            set(value)
            {
                this.$store.commit('ui/SET_NOTIFICATIONS_DRAWER_VISIBILITY', value);
            }
        },

        desktopNotifications: {
            get(): boolean
            {
                return _.get(
                    this.$store.getters.app,
                    'user.settings.notifications.desktopNotifications'
                ) || false;
            },
            set(value: boolean)
            {
                this.$store.commit('user/CHANGE_SETTING', {
                    notifications: {
                        desktopNotifications: value
                    }
                });
            }
        }
    },

    methods: {
        /**
         * Enable the desktop notifications.
         */
        enableDesktopNotifications(enable: boolean): void
        {
            if (enable) {
                if (! PushJS.Permission.has()) {
                    PushJS.Permission.request(() => {
                        this.desktopNotifications = true;
                        this.$api.users.update({
                            id: this.$user.id,
                            settings: this.$user.settings
                        });
                    }, () => {
                        setTimeout(() => {
                            this.desktopNotifications = false;
                        });
                    });
                } else {
                    this.desktopNotifications = true;
                    this.$api.users.update({
                        id: this.$user.id,
                        settings: this.$user.settings
                    });
                }
            } else {
                this.desktopNotifications = false;
                this.$api.users.update({
                    id: this.$user.id,
                    settings: this.$user.settings
                });
            }
        },

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
                        .then((response: ResponseInterface) => {
                            Notification.create({data: []});
                        });
                });
        }
    }
}

</script>
