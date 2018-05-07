# Components and mixins

Components can be registered globally in *resources/assets/js/App/Components.js*:

    import MyComponent from './Components/MyComponent.vue';

    export default {
        'my-component': MyComponent,
    }

    // resources/assets/js/App/Components.js

## Available components

`spa-skeleton` ships with the following global components:

- `animated-router-view`: A `router-view` with some animation applied to it.
- `button-confirm`: A button which requires to be clicked twice and adds a timeout before it 
  executing its action.
- `button-submit`: A button that shows a loading icon until its action completes/fails.
- `form-main`: A form wrapper.
- `navigation-drawer-main`: A navigation drawer wrapper.
- `layout-root`: A mixin
- `partial-markdown`: A markdown parser.
- `toolbar-main`: A toolbar wrapper.
- `toolbar-home`: A toolbar wrapper with a notificaiton icon.
- `time-from-now`: A component that displays the time passed from a specific time.

Many other components and mixins are available for usage and can be imported from the
*src/Components* folder.

---
[More about components](https://vuejs.org/v2/guide/components.html).