<template>
    <v-app light>
        <toolbar-main></toolbar-main>
        <main>
            <v-content>
                <v-container grid-list-lg fluid>
                    <v-layout class="mt-3">
                        <v-flex xs12 sm12 lg6 offset-lg3 xl4 offset-xl4>
                            <v-card>
                                <v-card-title>
                                    <h4>Log in</h4>
                                </v-card-title>
                                <form-login></form-login>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <router-link to="/reset">I forgot my password :(</router-link>
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </main>
        <partial-footer></partial-footer>
    </v-app>
</template>

<script>

    import FormLogin  from '../Forms/Login.vue';
    import ToolbarMain from '../Toolbars/Main.vue';

    export default
    {
        components : { FormLogin, ToolbarMain }
    }

</script>