<template>
    <error-main :back-button="false" title="Whoops">
        <v-flex xs12 offset-md3 md6 offset-lg4 lg4 class="mt-5">
            <p>Something went wrong while loading this page.</p>
            <p>
                The {{ config.name }} team has already been informed about the issue and will start
                investigating and fixing the problem as soon as possible.
            </p>
        </v-flex>
    </error-main>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    import { ErrorMain }      from './Main.vue';

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
