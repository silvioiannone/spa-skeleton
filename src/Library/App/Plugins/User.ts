import Vue from 'vue';
import { StateMachine } from '../../Services/StateMachine';

/**
 * This plugin allows quick access to the currently logged in user.
 */
export function User(vue: typeof Vue): void
{
    Object.defineProperty(vue.prototype, '$user', {
        get: (): any => StateMachine.getStore().getters.app.user
    });
}
