<template>
    <v-app :light="theme === 'light'" :dark="theme === 'dark'">
        <slot name="navigationDrawer" v-if="status !== 'error' && status !== 'unauthenticated'">
        </slot>
        <slot name="navigationDrawerRight" v-if="status !== 'error' && status !== 'unauthenticated'">
        </slot>
        <slot name="toolbar"></slot>
        <v-content>
            <slot v-if="status !== 'error' && status !== 'unauthenticated'"></slot>
            <error-server-error v-if="status === 'error'"></error-server-error>
            <error-not-found v-if="status === 'notFound'"></error-not-found>
        </v-content>
        <snackbar-global></snackbar-global>
    </v-app>
</template>

<script>

    import SnackbarGlobal from "../Snackbars/Global.vue";
    import ErrorServerError from '../Views/Errors/Unauthorized.vue';
    import ErrorNotFound from '../Views/Errors/NotFound.vue';

    export default
    {
        name: 'LayoutApp',

        components: {
            ErrorNotFound,
            ErrorServerError,
            SnackbarGlobal
        },

        computed: {

            status ()
            {
                return this.$store.getters.app.status;
            },

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
