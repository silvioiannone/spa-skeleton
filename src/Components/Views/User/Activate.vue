<template>
    <v-app>
        <toolbar-main></toolbar-main>
        <main>
            <v-container grid-list-lg fluid>
                <v-layout class="ma-3">
                    <v-flex xs12 sm12 lg6 offset-lg3 xl4 offset-xl4>
                        <v-card>
                            <v-card-title>
                                Activate account
                            </v-card-title>
                            <v-card-text>
                                You have been invited to join BloomEstate. Please, review your
                                account info.
                            </v-card-text>
                            <v-card-text>
                                <form-activate :user="user" :activation-id="activationId">
                                </form-activate>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>

<script>

    import API          from '../../../Library/API';
    import FormActivate from '../../Forms/Activate.vue';
    import ToolbarMain   from '../../Toolbars/Main.vue';

    let api = new API();

    export default
    {
        name: 'UserActivate',

        components: {
            FormActivate, ToolbarMain
        },

        data()
        {
            return {

                /**
                 * Contains the basic infos of the invited user
                 */
                user: null
            }
        },

        computed: {

            activationId()
            {
                return this.$route.params.activationId;
            }
        },

        mounted()
        {
            api.users.getActivation( this.$route.params.activationId)
                .then((response) => this.user = response.body.data);
        }
    }
</script>
