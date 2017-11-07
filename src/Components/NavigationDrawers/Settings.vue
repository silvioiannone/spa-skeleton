<template>
    <navigation-drawer-main>
        <v-list class="pa-0">
            <v-list-tile avatar to="/home">
                <v-list-tile-avatar>
                    <v-icon>arrow_back</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile>
        </v-list>
        <v-divider></v-divider>
        <v-list>
            <v-list-tile to="/settings/account">
                <v-list-tile-title>Account</v-list-tile-title>
            </v-list-tile>
        </v-list>
    </navigation-drawer-main>
</template>

<script>

    export default
    {
        name: 'NavigationDrawerSettings',

        computed: {

            user()
            {
                return this.$store.getters.app.user;
            }
        }
    }

</script>
