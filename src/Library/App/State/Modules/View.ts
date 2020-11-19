import { Module }                                from '../../../State/Module';
import { Config, ResponseInterface, ViewAction } from 'spa-skeleton';
import { Store }                                 from 'vuex';
import { RouteRecord } from 'vue-router';

/**
 * State machine view module.
 */
export class View extends Module
{
    /**
     * Module name.
     */
    protected name: string = 'view';

    /**
     * Get the module's actions.
     */
    protected actions(): { (key: string): ViewAction } | {}
    {
        let actions = {};

        // / route.
        actions['view/ROOT'] = (store: Store<any>): Promise<ResponseInterface> =>
        {
            return new Promise((resolve, reject): void =>
            {
                if (store.getters.app.settings) {
                    resolve();
                    return;
                }

                this.api.app.getSettings()
                    .then((response: ResponseInterface): void =>
                    {
                        store.commit('app/SET_SETTINGS', response.body.data);
                        resolve();
                    })
                    .catch((error: any): void => reject(error));
            })
        };

        /**
         * /home route
         */
        actions['view/HOME'] = (store: Store<any>): Promise<ResponseInterface> =>
        {
            return new Promise((resolve, reject): void => {
                let userId = store.getters.app.user.id;

                if (userId) {
                    resolve();
                    return;
                }

                this.api.users
                    .setParameters({
                        include: 'role,unread_notifications'
                    })
                    .find('me')
                    .then((response: ResponseInterface): void =>
                    {
                        let user = response.body.data;

                        store.commit('user/STORE_AUTHENTICATED_USER', user);
                        store.commit('notifications/STORE', {data: user.unread_notifications});
                        resolve();
                    })
                    .catch((error: any): void => reject(error));
            });
        };

        /**
         * /settings route
         */
        actions['view/SETTINGS'] = (store: Store<any>): Promise<ResponseInterface> =>
        {
            return new Promise((resolve, reject): void =>
            {
                let userId = store.getters.app.user.id;

                if (userId) {
                    resolve();
                    return;
                }

                this.api.users
                    .setParameters({
                        include: 'role'
                    })
                    .find('me')
                    .then((response: ResponseInterface): void =>
                    {
                        store.commit('user/STORE_AUTHENTICATED_USER', response.body.data);
                        resolve();
                    })
                    .catch((error: any): void => reject(error));
            });
        };

        return actions;
    }

    /**
     * Get the parameters that should be passed to the API if the view will display paginated data
     * (a list of users for example).
     */
    protected getQueryParameters(payload: any, defaultParameters: any = {}): any
    {
        let pageSizeParameter = Config.app.paginationSize;

        if (defaultParameters['page[size]']) {
            pageSizeParameter = defaultParameters['page[size]'];
        }

        if (payload.route.query.size) {
            pageSizeParameter = payload.route.query.size;
        }

        let parameters = {
            'page[number]': payload.route.query.page || 1,
            'page[size]': pageSizeParameter
        };

        let sortParameter = payload.route.query.sort || defaultParameters.sort || null;
        if (sortParameter) {
            parameters['sort'] = sortParameter;
        }

        let searchParameter = payload.route.query.search || null;
        if (searchParameter) {
            parameters['search'] = searchParameter;
        }

        return parameters;
    }

    /**
     * Get query filters.
     */
    protected getQueryFilters(payload: any, filters: string[]): any
    {
        let parameters = {};

        filters.forEach((filter: string): void => {
            if (payload.route.query[filter]) {
                parameters[`filter[${filter}]`] = payload.route.query[filter];
            }
        });

        return parameters;
    }

    /**
     * Check if the given route is matching the one in the payload.
     */
    protected isMatchingRoute(payload: any, route: string): boolean
    {
        return !! payload.route.matched.find(
            (payloadRoute: any): boolean => payloadRoute.path === route
        );
    }

    /**
     * Check if the given routes is matching the one in the payload.
     */
    protected isMatchingRoutes(payload: any, routes: string[]): boolean
    {
        routes.forEach((route: string) => {
            if (! this.isMatchingRoute(payload, route)) {
                return false;
            }
        })

        return true;
    }

    /**
     * Check if the given route matches exactly the one in the payload.
     */
    protected routeIs(payload: any, route: string): boolean
    {
        return payload.route.matched[payload.route.matched.length - 1].path === route;
    }

    /**
     * Check if the current route is a child route.
     */
    protected routeIsChildRoute(payload: any, route: string): boolean
    {
        return !! payload.route.matched.find((matched: RouteRecord) => {
            return matched.path.startsWith(route) &&
                matched.path !== route &&
                matched.path !== route + '/';
        });
    }
}
