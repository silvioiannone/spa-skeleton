/**
 * Toolbar management utilities.
 */
import { StateMachine, Store } from '../../Services/StateMachine';

/**
 * A toolbar breadcrumb.
 */
interface ToolbarBreadcrumb {
    text: string;
    to?: string;
}

/**
 * A collection of toolbar breadcrumbs.
 */
type ToolbarBreadcrumbs = ToolbarBreadcrumb[];

/**
 * Toolbar management utilities.
 */
export class Toolbar
{
    /**
     * Set the toolbar's breadcrumbs.
     */
    public static setBreadcrumbs(breadcrumbs: ToolbarBreadcrumbs): void
    {
        Toolbar.store().commit('app/SET', {
            key: 'ui.toolbar.breadcrumbs',
            value: breadcrumbs
        });
    }

    /**
     * Access the store.
     */
    protected static store(): Store
    {
        return StateMachine.getStore();
    }
}
