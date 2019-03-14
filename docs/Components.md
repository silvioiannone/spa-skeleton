# Components and mixins

Components can be registered globally in *resources/ts/App/Components.ts*:

    import MyComponent from './Components/MyComponent.vue';

    export default {
        'my-component': MyComponent,
    }

    // resources/assets/js/App/Components.js
    
## Using the components

### Global components

Some components are exported globally by `spa-skeleton` so it's enough to just use them within any
other compoent's template:

    <template>
        <global-component></global-component>
    </template>
    
### Exported components

Components that are exported directly by `spa-skeleton` through `index.ts` can be easily imported:

    import Vue               from 'vue';
    import { ComponentName } from 'spa-skeleton';
    
    @Component({
        components: {
            ComponentName
        }
    })
    export default class NewComponent extends Vue
    {
    }
    
### Non-exported components

Some components are not yet exported directly by `index.ts` and need to be imported directly:

    import ComponentName form 'spa-skeleton/src/Components/...';

## Available components

`spa-skeleton` ships with the following components:

### Avatars

 - `avatar-user`: Displays a user avatar.
 
### Breadcrumbs

 - `breadcrumbs-main`: Display some navigation breadcrumbs.

### Buttons

 - `button-confirm`: A button that requires a confirmation from the user before its action is
 executed.
 - `button-main`: Button that displays a loading animation while its actions is executing.
 - `button-submit`: Similar to `button-main` but tailored for usage with forms.
 
### Cards

 - `card-form`: A card that is tailored for displaying a form inside.
 - `card-main`: A generic card.
 
### Chips
 
 - `chip-main`: A generic chip.
 
### DataTables

 - `data-table-main`: A generic datatable.
 
### Dialogs

 - `dialog-card`: A dialog containing a card.
 - `dialog-confirmation`: A dialog displaying a confirmation message.
 - `dialog-form`: A dialog containing a form.
 - `dialog-main`: A generic dialog.
 
### Forms

 - `form-login`: A login form ready to be used.
 - `form-main`: A generic form.
 - `form-password-ask-reset`: A form asking for a password reset.
 - `form-password-reset`: A form that can be used in order to reset a user's password.
 
### Icons

 - `icon-mime-type`: An icon displaying a file's mimetype.
 
### Inputs

 - `input-autocomplete`: An input that supports autocompletion.
 - `input-dynamic`: An input component that is generated using a configuration prop.
 - `input-editor`: A WYSIWYG editor.
 - `input-phone`: A phone input.
 
### Layouts

 - `layout-app`: An app layout. It has slots for navigation bars, content and a toolbar.
 
### Menus
 
 - `menu-crud`: A menu pre-populated with an update and delete items.
 
### Misc

 - `responsive-container`: A container that behaves responsively.
 - `animated-router-view`: A router view that applies some transition effects.
 - `file-select`: A file selection component.
 - `file-upload`: A file upload component.
 - `i-frame`: A component displaying content inside an i-frame.
 
### Navigaion drawers

 - `navigation-drawer-home`: A navigation drawer suitable for a home view.
 - `navigation-drawer-main`: A generic navigation drawer.
 - `nagigation-drawer-notifications`: A navigation drawer that can display notifications.

### Paginations

 - `pagination-main`: A generic pagination component.
 
### Partials

 - `time-from-now`: A component that displays the amount of time elapsed since the given time.
 
### Selects

 - `select-main`: A generic select box component.
 
### Snackbars

 - `snackbars-global`: A global snackbar component.
 
### Text fields

 - `text-field-search`: A search text field.
 - `text-field-swedish-ssn`: A text field that validates a Swedish SSN.
 
### Toolbars

 - `toolbar-home`: A toolbar that is suitable for a home view.
 - `toolbar-main`: A generic toolbar.

Many other components and mixins are available for usage and can be imported from the
*src/Components* folder.

## Available mixins

 - `Autocomplete`: Mixin for building autocomplete components.
 - `Breadcrumbs`: Mixin for building breadcrumb components.
 - `Button`: Mixin for building button components.
 - `Chip`: Mixin for building chip components.
 - `Component`: Mixin for building other components.
 - `Dialog`: Mixin for buildling dialog components.
 - `Form`: Mixin for building form components.
 - `Input`: Mixin for building input components.
 - `Root`: Mixin for the root component.
 - `Select`: Mixin for building select components.
 - `SettingsSetter`: Mixin for accessing and changing the app settings.
 - `Subscribable`: Mixin for subscribing to some events.
 - `TextField`: Mixin for building text field components.
 - `Wrapper`: Mixin for building components wrapping other components.

### Components

 - `ComponentFilterable`: A mixin that can be applied to a component that needs to filter data using
 API requests.
 - `ComponentPaginatable`: A mixin that can be applied to a component that needs to paginate data
 coming from the server.
 - `ComponentSearchable`: A mixin that can be applied to a component that needs to perform searches
 on server-side data.
 - `ComponentRequestParameterWatcher`: A mixin that will trigger a callback whenever the parameters
 defined inside an object are changed.
 
### Data tables
 
 - `DataTablePaginated`: A mixin that can be applied to a Data Table component that needs to display
 paginated data.
 
### Views

 - `ViewFilterable`: A mixin that can be applied to a view that needs to filter server side data.
 - `ViewPaginated`: A mixin that can be applied to a view that needs to paginate server side data.
 - `ViewSearchable`: A mixin that can be applied to a view that needs to search server side data.

## Create new components

Since `spa-skeleton` is written using TypeScript then components cannot be created by using simple
vue objects, but instead they need to be built using class based components.

More information about class based components can be found here:

 - [Vue Class Component](https://github.com/vuejs/vue-class-component)
 - [Vue Property Decordator](https://github.com/kaorun343/vue-property-decorator)

---
[More about components](https://vuejs.org/v2/guide/components.html).
