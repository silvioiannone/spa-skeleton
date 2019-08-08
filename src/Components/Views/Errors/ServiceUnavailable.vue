<template>
    <error-main :back-button="false">
        <v-layout>
            <v-flex xs12>
                <div class="text-center mb-5">
                    <v-icon x-large>error_outline</v-icon>
                </div>
                <h1 class="text-center">The application is under maintenance.</h1>
                <p class="text-center">Please try again in a few minutes.</p>
            </v-flex>
        </v-layout>
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
    export class ErrorServiceUnavailable extends Vue
    {
    }

    export default ErrorServiceUnavailable;

</script>
