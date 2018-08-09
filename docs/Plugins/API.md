# API plugin

The API plugin allows to easily access the API client from any component.

## Usage

From any component you can easily the API client:

    created()
    {
        this.$api.users()
            .find(2)
            .then(() => ...)
            .catch(() => ...);
    }

For more information about the API client read its documentation.
