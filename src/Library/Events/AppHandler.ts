import AbstractHandler from './AbstractHandler';

/**
 * Handle events that should make changes to the App state machine module.
 */
export default class AppHandler extends AbstractHandler
{
    'Models.UserUpdated'(event: any): void
    {
        let authenticatedUser = this.vue.$store.getters.app.user;

        if (event.data.id === authenticatedUser.id) {
            this.vue.$store.commit('user/UPDATE_AUTHENTICATED_USER', event.data);
        }
    }

    '.Bloom\\Cluster\\Kernel\\App\\Events\\App\\SettingsUpdated'(event: any): void
    {
        this.vue.$store.commit('app/SET_SETTINGS', event.data);
    }
}
