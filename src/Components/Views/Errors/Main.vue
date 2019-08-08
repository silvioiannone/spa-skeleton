<template>
    <v-container>
        <v-layout>
            <slot></slot>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <div class="text-center">
                    <v-btn color="primary" large @click="goBack()" v-if="backButton">
                        <v-icon left>arrow_back</v-icon>{{$t('misc.goBack')}}
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
        <v-layout wrap v-if="app.config.env !== 'production' && error">
            <v-flex xs12 class="my-5">
                <v-divider></v-divider>
            </v-flex>
            <v-flex xs12>
                <v-expansion-panel>
                    <v-expansion-panel-content>
                        <div slot="header">{{$t('misc.details')}}</div>
                        <v-card>
                            <v-card-title class="headline">
                                <span v-if="error.status">{{ error.status }}</span>
                                - {{ error.body.message }}
                            </v-card-title>
                            <v-card-text>
                                <h5>
                                    {{$t('misc.onLine')}}
                                    <span class="monospaced">{{ error.body.line }}</span> {{$t('misc.in')}}
                                    <span class="monospaced">{{ error.body.file }}</span>.
                                </h5>
                            </v-card-text>
                            <v-card-text class="monospaced">
                                <pre>
                                    <code>{{ error.body.trace }}</code>
                                </pre>
                            </v-card-text>
                        </v-card>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';
    import { LayoutApp } from 'spa-skeleton/src/Components/Layouts/App.vue';

    @Component({
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
        }
    })
    export class ErrorMain extends Vue
    {
        get app()
        {
            return this.$store.getters.app;
        }

        get error()
        {
            return this.app.error;
        }

        goBack()
        {
            window.history.back();
        }
    }

    export default ErrorMain;

</script>
