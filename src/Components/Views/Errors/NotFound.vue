<template>
    <error-main :title="$t('misc.pageNotFound')" icon="error_outline"/>
</template>

<script lang="ts">

    import { Component, Vue } from 'vue-property-decorator';
    import { ErrorMain }      from './Main.vue';

    @Component({
        components: {
            ErrorMain
        }
    })
    export class ErrorNotFound extends Vue
    {
    }

    export default ErrorNotFound;

</script>
