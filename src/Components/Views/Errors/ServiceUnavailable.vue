<template>
    <error-main :back-button="false" title="Application under maintenance">
        <v-flex xs12>
            <p class="text-center">Please try again in a few minutes.</p>
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
    export class ErrorServiceUnavailable extends Vue
    {
    }

    export default ErrorServiceUnavailable;

</script>
