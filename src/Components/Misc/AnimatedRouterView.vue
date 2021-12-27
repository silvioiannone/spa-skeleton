<template>
    <v-slide-x-transition v-if="transition === 'slide-x'" :mode="mode">
        <router-view :name="name"/>
    </v-slide-x-transition>
    <v-fade-transition v-else-if="transition === 'fade'" :mode="mode">
        <router-view :name="name"/>
    </v-fade-transition>
</template>

<script lang="ts">

export default {

    name: 'AnimatedRouterView',

    props: {
        /**
         * Animation mode.
         */
        mode: { type: String, default: 'out-in' },

        /**
         * Name of the router view.
         */
        name: { type: String, default: 'default' },

        /**
         * The transition that should be applied. Only supports 'slide-x' and 'fade' at the
         * moment.
         */
        transition: { type: String, default: 'fade' }
    }
}

</script>
