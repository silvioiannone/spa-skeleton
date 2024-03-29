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

export default {

    name: 'NavigationDrawerMain',

    props: {

        /**
         * Sets the maximum width for the component.
         */
        maxWidth: { type: Number, default: undefined },

        /**
         * Put the navigation drawer on the right side.
         */
        right: { type: Boolean, default: false },

        /**
         * Navigation drawer's title.
         */
        title: { type: String, default: '' },

        /**
         * Sets the width for the component.
         */
        width: { type: Number, default: undefined },

        /**
         * A clipped drawer rests under the application toolbar
         */
        clipped: { type: Boolean, default: false }
    },

    computed: {
        visible: {
            get(): boolean
            {
                return this.$store.getters.app.ui
                    .navigationDrawers[this.right ? 'rightVisible': 'leftVisible'];
            },
            set(value: boolean)
            {
                if (this.right) {
                    this.$store.commit('ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY', value);
                    return;
                }

                this.$store.commit('ui/SET_NAVIGATION_DRAWER_VISIBILITY', value);
            }

        }
    },

    created(): void
    {
        this.visible = this.$vuetify.breakpoint.lgAndUp && !this.right;
    }
}

</script>
