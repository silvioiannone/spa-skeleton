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
