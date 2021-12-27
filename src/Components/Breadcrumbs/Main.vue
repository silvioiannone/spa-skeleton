<template>
    <v-breadcrumbs :divider="divider" :items="internalItems"/>
</template>

<script lang="ts">

import Breadcrumbs from '../Mixins/Breadcrumbs.vue';

export default {

    name: 'BreadcrumbsMain',

    mixins: [Breadcrumbs],

    computed: {
        internalItems(): any
        {
            return this.items.map(item => ({
                disabled: !item.to,
                exact: true,
                ...item,
            }));
        }
    }
}

</script>
