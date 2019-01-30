export { default as Config } from './Config';
export { default as ApiResource } from './Library/Api/Resources/ApiResource';
export { default as Api } from './Library/Api';
export { default as ResponseInterface } from './Library/Api/ResponseInterface';
export { default as StateMachineModule } from './Library/State/Module';

/*
 * Models.
 */
export { ExtendedModel as Model } from './Library/Services/StateMachine/VuexOrm/Support/ExtendedModel';
import NotificationModel from './Library/App/State/Models/Notification';

export namespace Models {
    export class Notification extends NotificationModel {}
}

/**
 * Components
 */
export { default as BreadcrumbsMain } from './Components/Breadcrumbs/Main.vue';
export { default as CardForm } from './Components/Cards/Form.vue';
export { default as CardMain } from './Components/Cards/Main.vue';
export { default as ChipMain } from './Components/Chips/Main.vue';
export { default as DataTableMain } from './Components/DataTables/Main.vue';
export { default as DialogMain } from './Components/Dialogs/Main.vue';
export { default as DialogForm } from './Components/Dialogs/Form.vue';
export { default as FormMain } from './Components/Forms/Main.vue';
export { default as LayoutApp } from './Components/Layouts/App.vue';
export { default as NavigationDrawerMain } from './Components/NavigationDrawers/Main.vue';
export { default as NavigationDrawerNotifications } from './Components/NavigationDrawers/Notifications.vue';
export { default as ResponsiveContainer } from './Components/Misc/Grid/ResponsiveContainer.vue';
export { default as ToolbarMain } from './Components/Toolbars/Main.vue';

/**
 * Mixins
 */
export { default as ViewFilterable } from './Components/Mixins/Views/Filterable.vue';
export { default as ViewSearchable } from './Components/Mixins/Views/Searchable.vue';
export { default as ViewPaginated } from './Components/Mixins/Views/Paginated.vue';
export { default as Subscribable } from './Components/Mixins/Subscribable.vue';
export { default as Wrapper } from './Components/Mixins/Wrapper.vue';

import App from './App';

export default App;
