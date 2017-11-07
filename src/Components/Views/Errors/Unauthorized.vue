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
                    <p>You are not authorized to view this page.</p>
                    <div class="mt-5 text-xs-center">
                        <v-btn class="mt-3" large color="primary" to="/login"
                               v-if="!userIsAuthenticated">
                            LOG IN
                        </v-btn>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </error>
</template>

<script>

    import Error from "./Main.vue";

    export default
    {
        name: 'ErrorServerError',

        components: {
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