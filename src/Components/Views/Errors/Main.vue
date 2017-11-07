<template>
    <v-app>
        <toolbar-main></toolbar-main>
        <main>
            <slot></slot>
            <v-container>
                <v-layout>
                    <v-flex xs12>
                        <div class="text-xs-center">
                            <v-btn color="primary" large @click="goBack()" v-if="backButton">
                                <v-icon left>arrow_back</v-icon>Go back
                            </v-btn>
                        </div>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
    </v-app>
</template>

<script>

    export default
    {
        name: 'Error',

        props: {

            /**
             * Whether or not to display the back button.
             */
            backButton: {
                type: Boolean,
                default: true
            }
        },

        computed: {

            app()
            {
                return this.$store.getters.app;
            }
        },

        methods: {

            goBack()
            {
                window.history.back();
            }
        }
    }

</script>