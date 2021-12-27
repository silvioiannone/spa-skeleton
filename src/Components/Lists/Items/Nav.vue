<template>
    <v-list-item :to="to" :exact="exact" :append="append">
        <v-list-item-avatar>
            <v-icon>{{ icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{ title | capitalize }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">

export default {

    name: 'ListItemNav',

    props: {
        /**
         * Whether the path shoulud be appended to the current route.
         */
        append: { type: Boolean, default: false },

        /**
         * Highlight the list item if the route (`to` prop) matches exactly.
         */
        exact: { type: Boolean, default: false },

        /**
         * Icon.
         */
        icon: { type: String, default: '' },

        /**
         * Title.
         */
        title: { type: String, default: '' },

        /**
         * To link destination.
         */
        to: { type: String, default: '' },
    }
}

</script>
