<template>
    <error-main :title="$t('misc.pageNotFound')" icon="error_outline"/>
</template>

<script lang="ts">

import ErrorMain from './Main.vue';

export default {

    name: 'ErrorNotFound',

    components: {
        ErrorMain
    }
}

</script>
