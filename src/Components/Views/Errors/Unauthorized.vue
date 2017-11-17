<template>
    <error :back-button="userIsAuthenticated">
        <v-container class="mt-5">
            <v-layout wrap>
                <v-flex xs12>
                    <div class="text-xs-center mb-5">
                        <v-icon x-large class="red--text">error_outline</v-icon>
                    </div>
                    <h3 class="text-xs-center">Unauthorized.</h3>
                </v-flex>
                <v-flex xs12 offset-md3 md6 offset-lg4 lg4 class="mt-5">
                    <v-card>
                        <v-alert icon="warning" color="warning" :value="true">
                            You are not authorized to view this page.
                            Authenticate in order to continue.
                        </v-alert>
                        <form-login :reload="true"></form-login>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </error>
</template>

<script>

    import Error from "./Main.vue";
    import FormLogin from '../../Forms/Login.vue';

    export default
    {
        name: 'ErrorServerError',

        components: {
            FormLogin,
            Error
        },

        computed: {

            userIsAuthenticated()
            {
                return typeof this.$store.getters.app.user.id !== 'undefined';
            }
        }
    }

</script>
