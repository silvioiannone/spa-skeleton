# Directives

New directives can be defined in the *resources/assets/js/App/Directives* directory and imported in
*resources/assets/js/App/Directives.ts*.

Directive example:

    export default {

        bind: (el, binding) =>
        {
            // Do stuff
        }
    }

    // resoureces/assets/js/App/Directives/OnClick.js

Import the directive:

    import OnClick from './OnClick'

    export default {
        'on-click': OnClick
    }

    // resources/assets/js/App/Directives.ts

---
[More about directives](https://vuejs.org/v2/guide/custom-directive.html).
