<template>
    <toolbar-home title="Settings"></toolbar-home>
</template>

<script>

    import ToolbarHome from './Home.vue';

    export default
    {
        components: {
            ToolbarHome
        },

        computed: {

            company()
            {
                return this.$store.getters.app.company;
            }
        }
    }

</script>