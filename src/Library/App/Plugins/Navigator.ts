import Vue                            from 'vue';
import { Route }                      from 'vue-router';
import { Navigator as NavigatorUtil } from '../../Utils/Navigator';

export function Navigator(vue: typeof Vue): void
{
    let navigator = new NavigatorUtil;

    // Make sure that the navigator always have an updated router and route by using vue-router
    // hooks.
    vue.mixin({
        beforeRouteUpdate: (to: Route, from: Route, next: Function): void =>
        {
            navigator.setRoute(to);
            navigator.setFromRoute(from);
            next();
        },
        beforeRouteEnter: (to: Route, from: Route, next: Function): void =>
        {
            next((vm: Vue): void =>
            {
                navigator.setInstance(vm);
                navigator.setFromRoute(from);
            });
        },
        beforeUpdate(): void
        {
            navigator.setInstance(this as any);
        }
    });

    vue.prototype.$navigator = navigator;
};
