<template>
    <v-container>
        <v-layout>
            <slot></slot>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-btn color="primary" large @click="goBack()" v-if="backButton">
                        <v-icon left>arrow_back</v-icon>Go back
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout wrap v-if="app.config.env !== 'production'">
            <v-flex xs12 class="my-5">
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <div slot="header">Details</div>
                        <v-card>
                            <v-card-title class="headline">
                                {{ error.status }} - {{ error.body.message }}
                            </v-card-title>
                            <v-card-text>
                                <h5>
                                    On line
                                    <span class="monospaced">{{ error.body.line }}</span> in
                                    <span class="monospaced">{{ error.body.file }}</span>.
                                </h5>
                            </v-card-text>
                            <v-card-text class="monospaced">
                                <pre>
                                    <code>{{ error.body.trace | json }}</code>
                                </pre>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import LayoutApp from 'spa-skeleton/src/Components/Layouts/App';

    export default
    {
        name: 'Error',

        components: {
            LayoutApp
        },

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
            },

            error()
            {
                return this.app.error;
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
