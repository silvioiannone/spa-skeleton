<template>
    <navigation-drawer-main>
        <v-list class="pa-0">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <avatar-user :size="38" :user="user"></avatar-user>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ user.first_name }} {{ user.last_name }}
                    </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-menu left>
                        <template #activator="data">
                            <v-btn icon v-on="data.on">
                                <v-icon>more_vert</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-tile to="/settings/account">
                                <v-list-tile-title>{{ $t('menu.settings') }}</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click.stop="_quit">
                                <v-list-tile-title>{{ $t('menu.quit') }}</v-list-tile-title>
                            </v-list-tile>
                        </v-list>
                    </v-menu>
                </v-list-tile-action>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <slot></slot>
        </v-list>
    </navigation-drawer-main>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { AvatarUser }           from '../Avatars/User.vue';
    import { NavigationDrawerMain } from './Main.vue';

    @Component({
        components: {
            AvatarUser,
            NavigationDrawerMain
        }
    })
    export class NavigationDrawerHome extends Vue
    {
        @Prop({
            validator(value: any): boolean
            {
                return typeof value === 'function'
            }
        }) quit: Function;

        get user(): any
        {
            return this.$store.getters.app.user;
        }

        /**
         * Quit from the application.
         */
        _quit(): void
        {
            if (this.quit) {
                this.quit();
                return;
            }

            this.$ws.disconnect();
            this.$router.push('/login');
        }
    }

    export default NavigationDrawerHome;

</script>
