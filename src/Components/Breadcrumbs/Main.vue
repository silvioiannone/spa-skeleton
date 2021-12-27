<template>
    <v-breadcrumbs :divider="divider" :items="_items"/>
</template>

<script lang="ts">

import Breadcrumbs from '../Mixins/Breadcrumbs.vue';

export default {

    name: 'BreadcrumbsMain',

    mixins: [Breadcrumbs],

    computed: {
        _items(): any
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
