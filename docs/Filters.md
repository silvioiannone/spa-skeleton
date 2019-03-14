# Filters

Filters can be imported using *resources/assets/ts/App/Filters.ts*.

Filter example:

    import AbstractFilter from './AbstractFilter';
    
    /**
     * This filter capitalizes the given string.
     */
    export default class Capitalize extends AbstractFilter
    {
        /**
         * Run the filter.
         */
        run(): (value: string) => string
        {
            return (value: string) =>
            {
                if (!value) {
                    return '';
                }
    
                return value.charAt(0).toUpperCase() + value.slice(1);
            }
        }
    }
    
    // resources/ts/App/Filters/Capitalize.ts
    
Import the filter:

    import Capitalize from './Filters/Capitalize';
        
    export default {
        capitalize: Capitalize
    }
    
    // resources/ts/App/Filters.ts
    
The filter can be used in any component's template:

    <p>{{ model.value | shiny }}</p>

---
[More about Vue filters](https://vuejs.org/v2/guide/filters.html).
