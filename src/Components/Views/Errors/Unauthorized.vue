<template>
    <error-main :back-button="false" :title="$t('misc.unauthorized')">
        <v-col xs="12" sm="8" md="6" lg="4" xl="3">
            <v-alert type="error" :value="true">
                {{$t('misc.youAreNotAuthorizedToViewThisPage')}}
                {{$t('misc.authenticateInOrderToContinue')}}
            </v-alert>
            <slot/>
        </v-col>
    </error-main>
</template>

<script lang="ts">

import ErrorMain from './Main.vue';

export default {

    name: 'ErrorUnauthorized',

    components: {
        ErrorMain
    }
}

</script>
