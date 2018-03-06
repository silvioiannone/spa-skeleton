# Filters

Filters can be imported using *resources/assets/js/App/Filters.js*.

Filter example:

    export default function (value)
    {
        return value + value;
    }
    
    // resources/assets/js/App/Filters/ShinyFilter.js
    
Import the filter:

    import ShinyFilter from './Filters/ShinyFilter'
        
    export default {
        shiny: ShinyFilter
    }
    
    // resources/assets/js/App/Filters.js
    
The filter can be used in any component's template:

    <p>{{ model.value | shiny }}</p>

---
[More about Vue filters](https://vuejs.org/v2/guide/filters.html).
