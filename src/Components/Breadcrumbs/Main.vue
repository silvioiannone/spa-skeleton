<template>
    <v-breadcrumbs :divider="divider" :items="_items"></v-breadcrumbs>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import Breadcrumbs           from '../Mixins/Breadcrumbs';

    @Component
    export default class BreadcrumbsMain extends Mixins(Breadcrumbs)
    {
        get _items()
        {
            return this.items.map(item =>
            {
                return {
                    disabled: ! item.to,
                    exact: true,
                    ...item,
                }
            });
        }
    }

</script>
