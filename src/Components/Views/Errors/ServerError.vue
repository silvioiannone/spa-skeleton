<template>
    <error-main :back-button="false" title="Whoops">
        <v-col>
            <p>Something went wrong while loading this page.</p>
            <p>
                The {{ config.name }} team has already been informed about the issue and will start
                investigating and fixing the problem as soon as possible.
            </p>
        </v-col>
    </error-main>
</template>

<script lang="ts">

import ErrorMain from './Main.vue';

export default {

    name: 'ErrorServerError',

    components: {
        ErrorMain
    },

    computed: {
        config()
        {
            return this.$store.getters.app.config;
        }
    }
}

</script>
