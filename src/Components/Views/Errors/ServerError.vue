<template>
    <error-main :back-button="false">
        <v-container class="mt-5">
            <v-layout wrap>
                <v-flex xs12>
                    <div class="text-xs-center mb-5">
                        <v-icon x-large class="red--text">error_outline</v-icon>
                    </div>
                    <h3 class="text-xs-center">Whoops.</h3>
                </v-flex>
                <v-flex xs12 offset-md3 md6 offset-lg4 lg4 class="mt-5">
                    <p>Something went wrong while loading this page.</p>
                    <p>
                        The {{ config.name }} team has already been informed about the issue and
                        will start investigating and fixing the problem as soon as possible.
                    </p>
                </v-flex>
            </v-layout>
        </v-container>
    </error-main>
</template>

<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';
    import { ErrorMain } from './Main.vue';

    @Component({
        components: {
            ErrorMain
        }
    })
    export class ErrorServerError extends Vue
    {
        get config()
        {
            return this.$store.getters.app.config;
        }
    }

    export default ErrorServerError;

</script>
