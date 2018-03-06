# Event Hub

This plugin works a global even hub. Each event sent by the system and received by `spa-skeleton` is relayed through the
Event Hub plugin so that it's available globally.

## Usage

From within any component (in this case the `created()` hook):

    created()
    {
        this.$eh.$on(event =>
        {
            // Do stuff.
        })
    }
