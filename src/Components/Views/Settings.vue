<template>
    <layout-app>
        <navigation-drawer-settings name="navigationDrawer" slot="navigationDrawer">
        </navigation-drawer-settings>
        <toolbar-settings slot="toolbar"></toolbar-settings>
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
            this.$ws.subscribe(this, this.user);
        }
    }

</script>
