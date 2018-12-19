import Vue from 'vue';
import Router, { Route } from 'vue-router';
import { VuetifyObject } from 'vuetify';
import { ErrorBag, Validator }     from 'vee-validate';
import Api from '../Library/Api';

declare module 'vue/types/vue'
{
    interface Vue
    {
        $api: Api,
        $eh: Vue,
        $route: Route,
        $router: Router
        $vuetify: VuetifyObject,
        $validator: Validator,
        errors: ErrorBag
    }
}

declare module "*.vue"
{
    import Vue from 'vue';
    export default Vue;
}
