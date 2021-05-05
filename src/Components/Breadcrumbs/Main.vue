<template>
    <v-breadcrumbs :divider="divider" :items="_items"/>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import Breadcrumbs from '../Mixins/Breadcrumbs.vue';

    @Component
    export class BreadcrumbsMain extends Mixins(Breadcrumbs)
    {
        get _items()
        {
            return this.items.map(item => {
                return {
                    disabled: ! item.to,
                    exact: true,
                    ...item,
                }
            });
        }
    }

    export default BreadcrumbsMain;

</script>
