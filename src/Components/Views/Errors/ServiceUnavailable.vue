<template>
    <error :back-button="false">
        <v-layout>
            <v-flex xs12>
                <div class="text-xs-center mb-5">
                    <v-icon x-large>error_outline</v-icon>
                </div>
                <h1 class="text-xs-center">The application is under maintenance.</h1>
                <p class="text-xs-center">Please try again in a few minutes.</p>
            </v-flex>
        </v-layout>
    </error>
</template>

<script lang="ts">
    
    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';
    import Error         from './Main.vue';

    @Component({
        components: {
            Error
        }
    })
    export default class ErrorServiceUnavailable extends Vue
    {
    }
    
</script>
