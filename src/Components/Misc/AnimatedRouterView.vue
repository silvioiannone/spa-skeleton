<template>
    <v-slide-x-transition mode="out-in">
        <router-view :name="name"></router-view>
    </v-slide-x-transition>
</template>

<script>

    export default
    {
        name: 'AnimatedRouterView',

        props: {

            /**
             * Name of the router view.
             */
            name: {
                type: String,
                default: 'default'
            }
        }
    }

</script>