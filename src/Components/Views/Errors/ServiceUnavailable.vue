<template>
    <error-main :back-button="false" title="Application under maintenance">
        <v-col>
            <p class="text-center">Please try again in a few minutes.</p>
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
    export class ErrorServiceUnavailable extends Vue
    {
    }

    export default ErrorServiceUnavailable;

</script>
