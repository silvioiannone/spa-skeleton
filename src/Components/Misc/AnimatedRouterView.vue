<template>
    <v-slide-x-transition :mode="mode" v-if="transition === 'slide-x'">
        <router-view :name="name"></router-view>
    </v-slide-x-transition>
    <v-fade-transition :mode="mode" v-else-if="transition === 'fade'">
        <router-view :name="name"></router-view>
    </v-fade-transition>
</template>

<script lang="ts">

    import Vue from 'vue';

    export default Vue.extend({

        name: 'AnimatedRouterView',

        props: {

            mode: {
                type: String,
                default: 'out-in'
            },

            /**
             * Name of the router view.
             */
            name: {
                type: String,
                default: 'default',
            },

            /**
             * The transition that should be applied. Only supports 'slide-x' and 'fade' at the moment.
             */
            transition: {
                type: String,
                default: 'slide-x'
            }
        }
    });

</script>
