import { Route }  from 'vue-router';
import Vue        from 'vue';
import _Navigator from '../../Utils/Navigator';

export default function Navigator(vue: typeof Vue, options?: any): void
{
    let navigator = new _Navigator;

    // Make sure that the navigator always have an updated router and route by using vue-router
    // hooks.
    vue.mixin({
        beforeRouteUpdate: (to: Route, from: Route, next: Function) =>
        {
            navigator.setRoute(to);
            next();
        },
        beforeRouteEnter: (to: Route, from: Route, next: Function) =>
        {
            next((vm: Vue) =>
            {
                navigator.setInstance(vm);
            });
        }
    });

    vue.prototype.$navigator = navigator;
};
