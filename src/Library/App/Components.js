import Log            from 'loglevel';
import ComponentsList from 'assets/js/App/Components';

// Skeleton components
import AnimatedRouterView   from '../../Components/Misc/AnimatedRouterView.vue';
import ButtonConfirm        from '../../Components/Buttons/Confirm.vue';
import ButtonSubmit         from '../../Components/Buttons/Submit.vue';
import FormMain             from '../../Components/Forms/Main.vue';
import LayoutRoot           from '../../Components/Mixins/Root.vue';
import NavigationDrawerMain from '../../Components/NavigationDrawers/Main.vue';
import PartialTimeFromNow   from '../../Components/Partials/TimeFromNow';
import PartialFooter        from '../../Components/Partials/Footer.vue';
import ToolbarMain          from '../../Components/Toolbars/Main.vue';

const SkeletonComponents = {
    'animated-router-view': AnimatedRouterView,
    'button-confirm': ButtonConfirm,
    'button-submit': ButtonSubmit,
    'form-main': FormMain,
    'navigation-drawer-main': NavigationDrawerMain,
    'layout-root': LayoutRoot,
    'partial-footer': PartialFooter,
    'toolbar-main': ToolbarMain,
    'time-from-now': PartialTimeFromNow
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
     * @param vue Vue main instance.
     */
    constructor(vue)
    {
        this.vue = vue;
    }

    /**
     * Register the components.
     */
    boot()
    {
        Log.debug('Registering global components...');

        // Register the skeleton components
        let availableComponents = {};
        Object.assign(availableComponents, SkeletonComponents, ComponentsList);

        for(let key in availableComponents)
        {
            this.vue.component(key, availableComponents[key]);

            Log.debug('Component "' + key + '" registered.');
        }

        Log.debug('Global components registered.');
    }
}
