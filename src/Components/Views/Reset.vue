<template>
    <v-app light>
        <toolbar-main></toolbar-main>
        <main>
            <v-container grid-list-lg fluid>
                <v-layout class="ma-3">
                    <v-flex xs12 sm12 lg6 offset-lg3 xl4 offset-xl4>
                        <v-card>
                            <v-card-title>Reset password</v-card-title>
                            <v-card-text>
                                <form-password-reset v-if="token" :token="token"></form-password-reset>
                                <form-password-reset v-else></form-password-reset>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <partial-footer></partial-footer>
    </v-app>
</template>

<script>

    import FormPasswordReset from "../Forms/PasswordReset.vue";
    import ToolbarMain       from '../Toolbars/Main.vue';

    export default
    {
        name: 'Reset',

        components : {
            FormPasswordReset,
            ToolbarMain
        },

        computed: {

            token()
            {
                return this.$route.query.token || false;
            }
        }
    }

</script>
