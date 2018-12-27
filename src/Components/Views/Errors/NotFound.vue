<template>
    <error>
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
    </error>
</template>

<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';
    import Error         from "./Main.vue";

    @Component({
        components: {
            Error
        }
    })
    export default class ErrorNotFound extends Vue
    {
    }

</script>
