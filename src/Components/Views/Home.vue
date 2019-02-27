<template>
    <layout-app>
        <template #navigatino-drawer>
            <animated-router-view name="navigationDrawer"></animated-router-view>
        </template>
        <template #navigation-drawer-right>
            <router-view name="navigationDrawerRight"></router-view>
        </template>
        <template #toolbar>
            <router-view name="toolbar"></router-view>
        </template>
        <animated-router-view></animated-router-view>
    </layout-app>
</template>

<script>

    import LayoutApp from "../Layouts/App.vue";

    export default
    {
        name: 'Home',

        components: {
            LayoutApp
        },

        mounted()
        {
            this.$ws.subscribe(this);
        },

        watch: {

            user()
            {
                this.$ws.subscribe(this);
            }
        }
    }

</script>
