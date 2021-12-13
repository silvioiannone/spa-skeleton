<template>
    <v-app :light="theme === 'light'" :dark="theme === 'dark'">
        <template v-if="status === 'ready' || status === 'loading'">
            <slot name="navigation-drawer">
                <animated-router-view name="navigationDrawer"/>
            </slot>
            <slot name="navigation-drawer-right">
                <router-view name="navigationDrawerRight"/>
            </slot>
            <slot name="toolbar">
                <app-bar-main app>
                    <template #toolbar>
                        <animated-router-view name="toolbar"/>
                    </template>
                </app-bar-main>
            </slot>
        </template>
        <v-main>
            <slot>
                <animated-router-view v-if="status === 'ready' || status === 'loading'"/>
            </slot>
            <error-unauthorized v-if="status === 'unauthorized'">
                <slot name="error-unauthorized"/>
            </error-unauthorized>
            <error-server-error v-if="status === 'error'"/>
            <error-not-found v-if="status === 'notFound'"/>
            <error-service-unavailable v-if="status === 'serviceUnavailable'"/>
            <error-too-many-attempts v-if="status === 'tooManyAttempts'"/>
        </v-main>
        <slot name="bottomNavigation">
            <animated-router-view v-if="status === 'ready' || status === 'loading'"
                                  name="bottomNavigation"/>
        </slot>
        <footer-app-update v-if="app.updateAvailable"/>
        <snackbar-global/>
    </v-app>
</template>

<script lang="ts">

import SnackbarGlobal from '../Snackbars/Global.vue';
import ErrorNotFound from '../Views/Errors/NotFound.vue';
import ErrorServerError from '../Views/Errors/ServerError.vue';
import ErrorServiceUnavailable from '../Views/Errors/ServiceUnavailable.vue';
import ErrorUnauthorized from '../Views/Errors/Unauthorized.vue';
import ErrorTooManyAttempts from '../Views/Errors/TooManyAttempts.vue';
import FooterAppUpdate from '../Footers/AppUpdate.vue';

export default {

    name: 'LayoutApp',

    components: {
        ErrorNotFound,
        ErrorServerError,
        ErrorServiceUnavailable,
        ErrorTooManyAttempts,
        ErrorUnauthorized,
        FooterAppUpdate,
        SnackbarGlobal
    },

    computed: {
        app(): any
        {
            return this.$store.getters.app;
        },

        status(): string
        {
            return this.app.status;
        },

        theme(): string
        {
            try {
                return this.user.settings.ui.theme;
            } catch (error) {
                return 'light';
            }
        },

        user(): any
        {
            return this.app.user;
        }
    }
}

</script>
