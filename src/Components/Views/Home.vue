<template>
    <layout-app>
        <animated-router-view name="navigationDrawer" slot="navigationDrawer"></animated-router-view>
        <router-view name="navigationDrawerRight" slot="navigationDrawerRight"></router-view>
        <router-view name="toolbar" slot="toolbar"></router-view>
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
            this.$ws.subscribe(this, this.user);
        },

        watch: {

            user()
            {
                this.$ws.subscribe(this, this.user);
            }
        }
    }

</script>
