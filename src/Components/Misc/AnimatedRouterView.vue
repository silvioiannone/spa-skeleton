<template>
    <v-slide-x-transition v-if="transition === 'slide-x'" :mode="mode">
        <router-view :name="name"/>
    </v-slide-x-transition>
    <v-fade-transition v-else-if="transition === 'fade'" :mode="mode">
        <router-view :name="name"/>
    </v-fade-transition>
</template>

<script lang="ts">

    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export class AnimatedRouterView extends Vue
    {
        /**
         * Animation mode.
         */
        @Prop({ type: String, default: 'out-in'}) mode: string;

        /**
         * Name of the router view.
         */
        @Prop({ type: String, default: 'default' }) name: string;

        /**
         * The transition that should be applied. Only supports 'slide-x' and 'fade' at the moment.
         */
        @Prop({ type: String, default: 'fade' }) transition: string;
    }

    export default AnimatedRouterView;

</script>
