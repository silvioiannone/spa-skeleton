let BuildLocalesTask = require('../Tasks/BuildLocales');

/**
 * This LaravelMix extension builds the locales.
 */
class BuildLocales
{
    /**
     * The API name for the component.
     */
    name()
    {
        return ['buildLocales', 'locales'];
    }

    /**
     * Register the component.
     */
    register()
    {
        Mix.addTask(new BuildLocalesTask)
    }
}

module.exports = BuildLocales;
