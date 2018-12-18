import Log            from 'loglevel';
import Vue            from 'vue';
import ComponentsList from '../../../../../resources/ts/App/Components';

// Skeleton components
// import AnimatedRouterView   from '../../Components/Misc/AnimatedRouterView.vue';
// import ButtonConfirm        from '../../Components/Buttons/Confirm.vue';
// import ButtonMain           from '../../Components/Buttons/Main.vue';
// import ButtonSubmit         from '../../Components/Buttons/Submit.vue';
// import FormMain             from '../../Components/Forms/Main.vue';
// import NavigationDrawerMain from '../../Components/NavigationDrawers/Main.vue';
// import PartialTimeFromNow   from '../../Components/Partials/TimeFromNow.vue';
// import PartialFooter        from '../../Components/Partials/Footer.vue';
// import PartialMarkdown      from '../../Components/Partials/Markdown.vue';
// import ResponsiveContainer  from '../../Components/Misc/Grid/ResponsiveContainer.vue';
// import ToolbarMain          from '../../Components/Toolbars/Main.vue';
// import ToolbarHome          from '../../Components/Toolbars/Home.vue';

const SkeletonComponents = {
    //'animated-router-view': AnimatedRouterView,
    //'button-confirm': ButtonConfirm,
    //'button-main': ButtonMain,
    //'button-submit': ButtonSubmit,
    //'form-main': FormMain,
    //'navigation-drawer-main': NavigationDrawerMain,
    //'partial-footer': PartialFooter,
    //'partial-markdown': PartialMarkdown,
    //'responsive-container': ResponsiveContainer,
    //'toolbar-main': ToolbarMain,
    //'toolbar-home': ToolbarHome,
    //'time-from-now': PartialTimeFromNow
};

/**
 * This class is used to register all the Vue components that should be available globally.
 *
 * It can be really useful for components used a lot in order to avoid to import them multiple
 * times.
 */
export default class Components
{
    /**
     * Register the components.
     */
    boot()
    {
        Log.debug('Registering global components...');

        // Register the skeleton components
        let availableComponents = {...SkeletonComponents, ...ComponentsList};

        for(let key in availableComponents)
        {
            Vue.component(key, availableComponents[key]);

            Log.debug('Component "' + key + '" registered.');
        }

        Log.debug('Global components registered.');
    }
}
