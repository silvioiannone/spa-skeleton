<template>
    <v-container fill-height>
        <v-layout align-center justify-center wrap>
            <v-flex xs12>
                <v-container class="mt-5">
                    <v-layout wrap>
                        <v-flex xs12>
                            <div class="text-center mb-5">
                                <v-icon x-large color="error">{{ icon }}</v-icon>
                            </div>
                            <h1 class="text-center display-2">{{ title }}</h1>
                        </v-flex>
                        <v-flex xs12 class="my-5" v-if="$slots.default">
                            <v-divider></v-divider>
                        </v-flex>
                        <slot></slot>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex xs12 v-if="backButton">
                <div class="text-center">
                    <v-btn color="primary" large outlined @click="goBack()" >
                        <v-icon left>arrow_back</v-icon>{{$t('misc.goBack')}}
                    </v-btn>
                </div>
            </v-flex>
            <template>
                <v-flex xs12 v-if="app.config.env !== 'production' && error && error.body.message">
                    <v-expansion-panels>
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
                                            {{ $t('misc.onLine') }}
                                            <span class="monospaced">{{ error.body.line }}</span>
                                            {{ $t('misc.in') }}
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
                    </v-expansion-panels>
                </v-flex>
            </template>
        </v-layout>
    </v-container>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
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
        /**
         * Whether or not to display the back button.
         */
        @Prop({ type: Boolean, default: true }) backButton: boolean;

        /**
         * The error's title.
         */
        @Prop({ type: String, default: '' }) title: string;

        /**
         * The error's icon.
         */
        @Prop({ type: String, default: 'error_outline' }) icon: string;

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
