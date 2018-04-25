<template>
    <v-app :light="theme === 'light'" :dark="theme === 'dark'">
        <template v-if="status === 'ready' || status === 'loading'">
            <slot name="navigationDrawer"></slot>
            <slot name="navigationDrawerRight"></slot>
            <slot name="toolbar"></slot>
        </template>
        <v-content>
            <slot v-if="status === 'ready' || status === 'loading'"></slot>
            <error-unauthorized v-if="status === 'unauthenticated'">
                <slot name="errorUnauthenticated"></slot>
            </error-unauthorized>
            <error-server-error v-if="status === 'error'"></error-server-error>
            <error-not-found v-if="status === 'notFound'"></error-not-found>
        </v-content>
        <snackbar-global></snackbar-global>
    </v-app>
</template>

<script>

    import SnackbarGlobal from "../Snackbars/Global.vue";
    import ErrorNotFound from '../Views/Errors/NotFound.vue';
    import ErrorServerError from '../Views/Errors/ServerError.vue';
    import ErrorUnauthorized from '../Views/Errors/Unauthorized.vue';

    export default
    {
        name: 'LayoutApp',

        components: {
            ErrorNotFound,
            ErrorServerError,
            ErrorUnauthorized,
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
