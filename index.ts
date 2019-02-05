export { default as Config } from './src/Config';
export { default as ApiResource } from './src/Library/Api/Resources/ApiResource';
export { default as Api } from './src/Library/Api';
export { default as ResponseInterface } from './src/Library/Api/ResponseInterface';
export { default as StateMachineModule } from './src/Library/State/Module';

/*
 * Utils.
 */
export { default as Pagination } from './src/Library/Utils/Pagination';

/*
 * Models.
 */
export { ExtendedModel as Model } from './src/Library/Services/StateMachine/VuexOrm/Support/ExtendedModel';
import NotificationModel from './src/Library/App/State/Models/Notification';

export namespace Models {
    export class Notification extends NotificationModel {}
}

/**
 * Components
 */
export { default as BreadcrumbsMain } from './src/Components/Breadcrumbs/Main.vue';
export { default as CardForm } from './src/Components/Cards/Form.vue';
export { default as CardMain } from './src/Components/Cards/Main.vue';
export { default as ChipMain } from './src/Components/Chips/Main.vue';
export { default as DataTableMain } from './src/Components/DataTables/Main.vue';
export { default as DialogMain } from './src/Components/Dialogs/Main.vue';
export { default as DialogForm } from './src/Components/Dialogs/Form.vue';
export { default as FormMain } from './src/Components/Forms/Main.vue';
export { default as InputAutocomplete } from './src/Components/Inputs/Autocomplete.vue';
export { default as LayoutApp } from './src/Components/Layouts/App.vue';
export { default as NavigationDrawerMain } from './src/Components/NavigationDrawers/Main.vue';
export { default as NavigationDrawerNotifications } from './src/Components/NavigationDrawers/Notifications.vue';
export { default as ResponsiveContainer } from './src/Components/Misc/Grid/ResponsiveContainer.vue';
export { default as SelectMain } from './src/Components/Select/Main.vue';
export { default as TextFieldSearch } from './src/Components/TextFields/Search.vue';
export { default as ToolbarMain } from './src/Components/Toolbars/Main.vue';
export { default as ViewErrorNotFound } from './src/Components/Views/Errors/NotFound.vue';

/**
 * Mixins
 */
export { default as ComponentPaginatable } from './src/Components/Mixins/Components/Paginatable.vue';
export { default as ViewFilterable } from './src/Components/Mixins/Views/Filterable.vue';
export { default as ViewSearchable } from './src/Components/Mixins/Views/Searchable.vue';
export { default as ViewPaginated } from './src/Components/Mixins/Views/Paginated.vue';
export { default as Subscribable } from './src/Components/Mixins/Subscribable.vue';
export { default as Wrapper } from './src/Components/Mixins/Wrapper.vue';

import App from './src/App';

export default App;
