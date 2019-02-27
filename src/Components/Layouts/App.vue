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
        </v-content>
        <snackbar-global></snackbar-global>
    </v-app>
</template>

<script lang="ts">

    import SnackbarGlobal          from '../Snackbars/Global.vue';
    import ErrorNotFound           from '../Views/Errors/NotFound.vue';
    import ErrorServerError        from '../Views/Errors/ServerError.vue';
    import ErrorServiceUnavailable from '../Views/Errors/ServiceUnavailable.vue';
    import ErrorUnauthorized       from '../Views/Errors/Unauthorized.vue';

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';

    @Component({
        components: {
            ErrorNotFound,
            ErrorServerError,
            ErrorServiceUnavailable,
            ErrorUnauthorized,
            SnackbarGlobal
        },
    })
    export default class App extends Vue
    {
        get status()
        {
            return this.$store.getters.app.status;
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
            return this.$store.getters.app.user;
        }
    }

</script>
