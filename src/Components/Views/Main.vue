<template>
    <v-app light toolbar>
        <toolbar-index></toolbar-index>
        <main>
            <v-content>
                <v-container grid-list-lg fluid>
                    <v-layout class="ma-3">
                        <v-flex xs12 sm12 lg6 offset-lg3 xl4 offset-xl4>
                            <v-card>
                                <v-card-title>
                                    <h4>Sign up</h4>
                                </v-card-title>
                                <form-signup></form-signup>
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

    import FormSignup from '../Forms/Signup.vue';
    import ToolbarIndex from '../Toolbars/Index.vue';

    export default
    {
        name: 'Main',

        components: {
            FormSignup, ToolbarIndex
        }
    }

</script>