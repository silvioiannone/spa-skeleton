import Vue from 'vue';
import Router, { Route }       from 'vue-router';
import { VuetifyObject }       from 'vuetify';
import { Store }               from 'vuex';
import { ErrorBag, Validator } from 'vee-validate';
import VueI18n, { IVueI18n }   from 'vue-i18n';
import Api                     from '../Library/Api';

declare module 'vue/types/vue'
{
    interface Vue
    {
        readonly $api: Api,
        readonly $i18n: VueI18n & IVueI18n;
        $eh: Vue
        $route: Route,
        $router: Router,
        $store: Store<any>,
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
