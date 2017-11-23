<template>
    <navigation-drawer-main>
        <v-list class="pa-0">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                    <avatar-user :user="user"></avatar-user>
                </v-list-tile-avatar>
                <v-list-tile-content>
                    <v-list-tile-title>
                        {{ user.first_name }} {{ user.last_name }}
                    </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                    <v-menu left>
                        <v-btn icon slot="activator">
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                        <v-list>
                            <v-list-tile to="/settings/account">
                                <v-list-tile-title>Settings</v-list-tile-title>
                            </v-list-tile>
                            <v-list-tile @click.stop="quit">
                                <v-list-tile-title>Quit</v-list-tile-title>
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

<script>

    import AvatarUser from "../Avatars/User.vue";

    export default
    {
        name: 'NavigationDrawerHome',

        components: {
            AvatarUser
        },

        computed:
        {
            user()
            {
                return this.$store.getters.app.user;
            }
        },

        methods: {

            /**
             * Quit from the application.
             */
            quit()
            {
                let self = this;

                this.$store.dispatch('user/QUIT')
                    .then(() =>
                    {
                        self.$ws.disconnect();
                        self.$router.push('/login');
                    });
            },
        }
    }

</script>
