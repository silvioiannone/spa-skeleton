import Vue from 'vue';
import Router, { Route }       from 'vue-router';
import { VuetifyObject }       from 'vuetify';
import { Store }               from 'vuex';
import { ErrorBag, Validator } from 'vee-validate';
import VueI18n, { IVueI18n }   from 'vue-i18n';
import { ApiClient }           from '../Library/Api';
import WebSocket               from '../Library/WebSocket';
import Navigator               from '../Library/Utils/Navigator';
import Head                    from '../Library/Utils/Head';
import { Toolbar }             from '../Library/Utils/Ui/Toolbar';
import Config                  from '../Config';

declare module 'vue/types/vue'
{
    interface Vue
    {
        readonly $api: ApiClient;
        readonly $i18n: VueI18n & IVueI18n;
        $t: typeof VueI18n.prototype.t;
        $tc: typeof VueI18n.prototype.tc;
        $te: typeof VueI18n.prototype.te;
        $d: typeof VueI18n.prototype.d;
        $n: typeof VueI18n.prototype.n;
        $eh: Vue;
        $config: Config;
        $head: typeof Head;
        $navigator: Navigator;
        $route: Route;
        $router: Router;
        $store: Store<any>;
        $vuetify: VuetifyObject;
        $validator: Validator;
        $ui: {
            toolbar: typeof Toolbar
        };
        $ws: WebSocket;
        errors: ErrorBag;
    }
}

declare module "*.vue"
{
    import Vue from 'vue';
    export default Vue;
}
