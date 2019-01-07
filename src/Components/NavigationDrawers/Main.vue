<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" :right="right" app clipped fixed
                         :disable-resize-watcher="right">
        <v-toolbar class="elevation-0" v-if="title || $slots.toolbar">
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer></v-spacer>
            <slot name="toolbar"></slot>
            <v-tooltip bottom>
                <v-btn icon slot="activator" @click="visible = false">
                    <v-icon>close</v-icon>
                </v-btn>
                <span>Close</span>
            </v-tooltip>
        </v-toolbar>
        <slot></slot>
    </v-navigation-drawer>
</template>

<script lang="ts">
    
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    
    @Component
    export default class NavigationDrawerMain extends Vue
    {
        /**
         * Put the navigation drawer on the right side.
         */
        @Prop({ type: Boolean, default: false }) right: boolean;

        /**
         * Navigation drawer's title.
         */
        @Prop({ type: String, default: '' }) title: string;

        get visible(): boolean
        {
            if (this.right)
            {
                return this.$store.getters.app.ui.rightNavigationDrawerVisible;
            }

            return this.$store.getters.app.ui.navigationDrawerVisible;
        }

        set visible(value: boolean)
        {
            if (this.right)
            {
                this.$store.commit('ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY', value);
                return;
            }

            this.$store.commit('ui/SET_NAVIGATION_DRAWER_VISIBILITY', value);
        }

        get user(): any
        {
            return this.$store.getters.app.user;
        }

        created(): void
        {
            this.visible = this.$vuetify.breakpoint.lgAndUp && !this.right;
        }
    }
    
</script>
