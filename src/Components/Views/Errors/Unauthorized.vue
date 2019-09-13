<template>
    <error-main :back-button="false" :title="$t('misc.unauthorized')">
        <v-flex xs12 offset-md3 md6 offset-lg4 lg4 class="mt-5">
            <v-alert type="error" :value="true">
                {{$t('misc.youAreNotAuthorizedToViewThisPage')}}
                {{$t('misc.authenticateInOrderToContinue')}}
            </v-alert>
            <slot></slot>
        </v-flex>
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
