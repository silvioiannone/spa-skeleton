<template>
    <error-main :back-button="false">
        <v-container class="mt-5">
            <v-layout wrap>
                <v-flex xs12>
                    <div class="text-center mb-5">
                        <v-icon x-large class="red--text">error_outline</v-icon>
                    </div>
                    <h3 class="text-center">{{$t('misc.unauthorized')}}.</h3>
                </v-flex>
                <v-flex xs12 offset-md3 md6 offset-lg4 lg4 class="mt-5">
                    <v-card>
                        <v-alert icon="warning" color="warning" :value="true">
                            {{$t('misc.youAreNotAuthorizedToViewThisPage')}}
                            {{$t('misc.authenticateInOrderToContinue')}}
                        </v-alert>
                        <slot></slot>
                    </v-card>
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
    export class ErrorUnauthorized extends Vue
    {
    }

    export default ErrorUnauthorized;

</script>
