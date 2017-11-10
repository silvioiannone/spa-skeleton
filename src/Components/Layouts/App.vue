<template>
    <v-app :light="theme === 'light'" :dark="theme === 'dark'">
        <slot name="navigationDrawer"></slot>
        <slot name="navigationDrawerRight"></slot>
        <slot name="toolbar"></slot>
        <main>
            <v-content>
                <slot></slot>
            </v-content>
        </main>
        <snackbar-global></snackbar-global>
    </v-app>
</template>

<script>

    import SnackbarGlobal from "../Snackbars/Global.vue";

    export default
    {
        name: 'LayoutApp',

        components: {
            SnackbarGlobal
        },

        computed: {

            user ()
            {
                return this.$store.getters.app.user;
            },

            theme ()
            {
                try {
                    return this.user.settings.ui.theme;
                } catch (error) {
                    return 'light';
                }
            }
        }
    }

</script>
