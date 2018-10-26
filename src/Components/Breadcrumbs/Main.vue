<template>
    <v-breadcrumbs :divider="divider" :items="_items"></v-breadcrumbs>
</template>

<script>

    import Breadcrumbs from '../Mixins/Breadcrumbs';

    export default {

        name: 'BreadcrumbsMain',

        mixins: [
            Breadcrumbs
        ],

        computed: {

            _items()
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
    }

</script>
