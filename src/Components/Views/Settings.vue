<template>
    <layout-app>
        <template #navigation-drawer>
            <navigation-drawer-settings name="navigationDrawer">
            </navigation-drawer-settings>
        </template>
        <template #toolbar>
            <toolbar-settings></toolbar-settings>
        </template>
        <animated-router-view></animated-router-view>
    </layout-app>
</template>

<script>

    import ToolbarSettings from '../Toolbars/Settings.vue';
    import LayoutApp from "../Layouts/App.vue";
    import NavigationDrawerSettings from "../NavigationDrawers/Settings.vue";

    export default
    {
        name: 'Settings',

        components: {
            NavigationDrawerSettings, LayoutApp, ToolbarSettings
        },

        mounted()
        {
            this.$ws.subscribe(this);
        }
    }

</script>
