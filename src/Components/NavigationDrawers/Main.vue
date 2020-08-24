<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" :right="right" app clipped
                         :disable-resize-watcher="right" :max-width="maxWidth" :width="width">
        <v-toolbar v-if="title || $slots.toolbar">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer/>
            <slot name="toolbar"/>
            <v-tooltip bottom>
                <template #activator="data">
                    <v-btn icon @click="visible = false" v-on="data.on">
                        <v-icon>close</v-icon>
                    </v-btn>
                </template>
                <span>Close</span>
            </v-tooltip>
        </v-toolbar>
        <slot/>
    </v-navigation-drawer>
</template>

<script lang="ts">

    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export class NavigationDrawerMain extends Vue
    {
        /**
         * Sets the maximum width for the component.
         */
        @Prop({ type: Number, default: undefined }) maxWidth: number | string;

        /**
         * Put the navigation drawer on the right side.
         */
        @Prop({ type: Boolean, default: false }) right: boolean;

        /**
         * Navigation drawer's title.
         */
        @Prop({ type: String, default: '' }) title: string;

        /**
         * Sets the width for the component.
         */
        @Prop({ type: Number, default: undefined }) width: number | string;

        /**
         * A clipped drawer rests under the application toolbar
         */
        @Prop({ type: Boolean, default: false }) clipped: boolean;

        get visible(): boolean
        {
            return this.$store.getters.app.ui
                .navigationDrawers[this.right ? 'rightVisible': 'leftVisible'];
        }

        set visible(value: boolean)
        {
            if (this.right) {
                this.$store.commit('ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY', value);
                return;
            }

            this.$store.commit('ui/SET_NAVIGATION_DRAWER_VISIBILITY', value);
        }

        created(): void
        {
            this.visible = this.$vuetify.breakpoint.lgAndUp && !this.right;
        }
    }

    export default NavigationDrawerMain;

</script>
