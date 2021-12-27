<template>
    <navigation-drawer-main>
        <v-list class="pa-0">
            <v-list-item avatar>
                <v-list-item-avatar>
                    <avatar-user :size="38" :user="$user"/>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        {{ $user.first_name }} {{ $user.last_name }}
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-menu left>
                        <template #activator="data">
                            <v-btn icon v-on="data.on">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item to="/settings/account">
                                <v-list-item-title>{{ $t('menu.settings') }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click.stop="internalQuit">
                                <v-list-item-title>{{ $t('menu.quit') }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item-action>
            </v-list-item>
        </v-list>
        <v-divider/>
        <v-list>
            <slot/>
        </v-list>
    </navigation-drawer-main>
</template>

<script lang="ts">

import AvatarUser from '../Avatars/User.vue';
import NavigationDrawerMain from './Main.vue';

export default {

    name: 'NavigationDrawerHome',

    components: {
        AvatarUser,
        NavigationDrawerMain
    },

    props: {

        quit: {
            validator(value: any): boolean
            {
                return typeof value === 'function'
            }
        }
    },

    methods: {

        /**
         * Quit from the application.
         */
        internalQuit(): void
        {
            if (this.quit) {
                this.quit();
                return;
            }

            this.$navigator.push('/login');
        }
    }
}

</script>
