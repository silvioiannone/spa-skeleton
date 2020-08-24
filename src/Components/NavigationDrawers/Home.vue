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
                            <v-list-item @click.stop="_quit">
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
            this.$navigator.push('/login');
        }
    }

    export default NavigationDrawerHome;

</script>
