<template>
    <v-container fill-height>
        <v-row align="center" justify="center">
            <v-col cols="12">
                <v-container class="mt-5">
                    <v-row class="justify-center">
                        <v-col cols="12" class="text-center">
                            <div class="mb-5">
                                <v-icon x-large color="error">{{ icon }}</v-icon>
                            </div>
                            <h1 class="display-2">{{ title }}</h1>
                        </v-col>
                        <v-col v-if="$slots.default" cols="12" class="my-5">
                            <v-divider/>
                        </v-col>
                        <slot/>
                    </v-row>
                </v-container>
            </v-col>
            <v-col v-if="backButton" cols="12" class="text-center">
                <v-btn color="primary" large outlined @click="goBack()" >
                    <v-icon left>arrow_back</v-icon>{{$t('misc.goBack')}}
                </v-btn>
            </v-col>
            <template>
                <v-col v-if="app.config.env !== 'production' && error && error.body.message"
                       cols="12">
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
                </v-col>
            </template>
        </v-row>
    </v-container>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { LayoutApp } from 'spa-skeleton/src/Components/Layouts/App.vue';

    @Component({
        components: {
            LayoutApp
        }
    })
    export class ErrorMain extends Vue
    {
        /**
         * Whether to display the back button.
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

        get app(): any
        {
            return this.$store.getters.app;
        }

        get error(): any
        {
            return this.app.error;
        }

        goBack(): void
        {
            window.history.back();
        }
    }

    export default ErrorMain;

</script>
