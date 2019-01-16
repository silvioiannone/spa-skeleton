import Vue           from 'vue';
import Service       from './Service';
import Logger        from './Logger';
import AppComponents from '../../../../../resources/ts/App/Components';

// Skeleton components
import AnimatedRouterView  from '../../Components/Misc/AnimatedRouterView.vue';
// import ButtonConfirm        from '../../Components/Buttons/Confirm.vue';
import ButtonMain           from '../../Components/Buttons/Main.vue';
import ButtonSubmit        from '../../Components/Buttons/Submit.vue';
import FormMain            from '../../Components/Forms/Main.vue';
// import NavigationDrawerMain from '../../Components/NavigationDrawers/Main.vue';
import TimeFromNow         from '../../Components/Partials/TimeFromNow.vue';
// import PartialFooter        from '../../Components/Partials/Footer.vue';
// import PartialMarkdown      from '../../Components/Partials/Markdown.vue';
import ResponsiveContainer from '../../Components/Misc/Grid/ResponsiveContainer.vue';
import ToolbarMain         from '../../Components/Toolbars/Main.vue';
// import ToolbarHome          from '../../Components/Toolbars/Home.vue';

const SkeletonComponents = {
    AnimatedRouterView,
    //'button-confirm': ButtonConfirm,
    ButtonMain,
    ButtonSubmit,
    FormMain,
    //'navigation-drawer-main': NavigationDrawerMain,
    //'partial-footer': PartialFooter,
    //'partial-markdown': PartialMarkdown,
    ResponsiveContainer,
    ToolbarMain,
    //'toolbar-home': ToolbarHome,
    TimeFromNow
};

/**
 * This service registers all the Vue components that should be available globally.
 *
 * It can be really useful for components used a lot in order to avoid to import them multiple
 * times.
 */
export default class Components extends Service
{
    /**
     * Service name.
     */
    name: string = 'Components';

    /**
     * Register the components.
     */
    boot(): void
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
