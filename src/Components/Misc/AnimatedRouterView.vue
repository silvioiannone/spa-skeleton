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
        @Prop({ type: String, default: 'slide-x' }) transition: string;
    }

    export default AnimatedRouterView;

</script>
