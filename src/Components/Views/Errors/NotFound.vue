<template>
    <error-main>
        <v-container class="mt-5">
            <v-layout>
                <v-flex xs12>
                    <div class="text-xs-center mb-5">
                        <v-icon x-large>error_outline</v-icon>
                    </div>
                    <h1 class="text-xs-center">Page not found.</h1>
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
    export class ErrorNotFound extends Vue
    {
    }

    export default ErrorNotFound;

</script>
