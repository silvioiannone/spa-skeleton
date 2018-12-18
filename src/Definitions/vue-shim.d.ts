import Vue from 'vue';
import Router, { Route } from 'vue-router';
import Api from '../Library/Api';

declare module 'vue/types/vue'
{
    interface Vue
    {
        $api: Api,
        $eh: Vue,
        $route: Route,
        $router: Router
        $vuetify: any,
        $validator: any,
        errors: any
    }
}

declare module "*.vue"
{
    import Vue from 'vue';
    export default Vue;
}
