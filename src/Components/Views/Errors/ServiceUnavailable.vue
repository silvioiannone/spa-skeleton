<template>
    <error-main :back-button="false" title="Application under maintenance">
        <v-col>
            <p class="text-center">Please try again in a few minutes.</p>
        </v-col>
    </error-main>
</template>

<script lang="ts">

import ErrorMain from './Main.vue';

export default {

    name: 'ErrorServiceUnavailable',

    components: {
        ErrorMain
    }
}

</script>
