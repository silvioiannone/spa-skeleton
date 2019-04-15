<template>
    <v-app :light="theme === 'light'" :dark="theme === 'dark'">
        <template v-if="status === 'ready' || status === 'loading'">
            <slot name="navigation-drawer"></slot>
            <slot name="navigation-drawer-right"></slot>
            <slot name="toolbar"></slot>
        </template>
        <v-content>
            <slot v-if="status === 'ready' || status === 'loading'"></slot>
            <error-unauthorized v-if="status === 'unauthorized'">
                <slot name="error-unauthorized"></slot>
            </error-unauthorized>
            <error-server-error v-if="status === 'error'"></error-server-error>
            <error-not-found v-if="status === 'notFound'"></error-not-found>
            <error-service-unavailable v-if="status === 'serviceUnavailable'">
            </error-service-unavailable>
            <error-too-many-attempts v-if="status === 'tooManyAttempts'"></error-too-many-attempts>
        </v-content>
        <snackbar-global></snackbar-global>
    </v-app>
</template>

<script lang="ts">

    import { Vue, Component }          from 'vue-property-decorator';
    import { SnackbarGlobal }          from '../Snackbars/Global.vue';
    import { ErrorNotFound }           from '../Views/Errors/NotFound.vue';
    import { ErrorServerError }        from '../Views/Errors/ServerError.vue';
    import { ErrorServiceUnavailable } from '../Views/Errors/ServiceUnavailable.vue';
    import { ErrorUnauthorized }       from '../Views/Errors/Unauthorized.vue';
    import { ErrorTooManyAttempts }    from '../Views/Errors/TooManyAttempts.vue';

    @Component({
        components: {
            ErrorNotFound,
            ErrorServerError,
            ErrorServiceUnavailable,
            ErrorTooManyAttempts,
            ErrorUnauthorized,
            SnackbarGlobal
        },
    })
    export class LayoutApp extends Vue
    {
        get app()
        {
            return this.$store.getters.app;
        }

        get status()
        {
            return this.app.status;
        }

        get theme()
        {
            try {
                return this.user.settings.ui.theme;
            } catch (error) {
                return 'light';
            }
        }

        get user()
        {
            return this.app.user;
        }
    }

    export default LayoutApp;

</script>
