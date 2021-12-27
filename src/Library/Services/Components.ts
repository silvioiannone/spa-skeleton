import Vue         from 'vue';
import { Service } from './Service';
import { Logger }  from './Logger';

import '../ComponentHooks';

import AppComponents from '../../../../../resources/ts/App/Components';

// Skeleton components
import AlertMain from '../../Components/Alerts/Main.vue';
import AnimatedRouterView from '../../Components/Misc/AnimatedRouterView.vue';
import AppBarMain from '../../Components/AppBars/Main.vue';
import ButtonMain from '../../Components/Buttons/Main.vue';
import ButtonSubmit from '../../Components/Buttons/Submit.vue';
import FormMain from '../../Components/Forms/Main.vue';
import TextareaMain from '../../Components/Textareas/Main.vue';
import TextFieldMain from '../../Components/TextFields/Main.vue';
import TimeFromNow from '../../Components/Partials/TimeFromNow.vue';
import ResponsiveContainer from '../../Components/Misc/Grid/ResponsiveContainer.vue';
import ToolbarMain from '../../Components/Toolbars/Main.vue';

const SkeletonComponents = {
    AlertMain,
    AnimatedRouterView,
    AppBarMain,
    ButtonMain,
    ButtonSubmit,
    FormMain,
    ResponsiveContainer,
    TextareaMain,
    TextFieldMain,
    ToolbarMain,
    TimeFromNow
};

/**
 * This service registers all the Vue components that should be available globally.
 *
 * It can be really useful for components used a lot in order to avoid to import them multiple
 * times.
 */
export class Components extends Service
{
    /**
     * Service name.
     */
    public name: string = 'Components';

    /**
     * Register the components.
     */
    public static async boot(): Promise<void>
    {
        // Register the skeleton components
        let availableComponents = {...SkeletonComponents, ...AppComponents};

        for(let key in availableComponents)
        {
            Vue.component(key, availableComponents[key]);

            Logger.debug('Component "' + key + '" registered.');
        }
    }
}
