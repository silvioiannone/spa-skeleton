<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" :right="right" app clipped fixed
                         :disable-resize-watcher="right">
        <v-toolbar class="elevation-0" dense v-if="title || $slots.toolbar">
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

<script>

    export default {

        name: 'NavigationDrawerMain',

        props: {

            /**
             * Put the navigation drawer on the right side.
             */
            right: {
                type: Boolean,
                default: false
            },

            /**
             * Navigation drawer's title.
             */
            title: {
                type: String,
                default: ''
            }
        },

        computed: {

            visible: {
                get()
                {
                    if (this.right)
                    {
                        return this.$store.getters.ui.rightNavigationDrawerVisible;
                    }

                    return this.$store.getters.ui.navigationDrawerVisible;
                },
                set(value)
                {
                    if (this.right)
                    {
                        this.$store.commit('ui/SET_RIGHT_NAVIGATION_DRAWER_VISIBILITY', value);
                        return;
                    }

                    this.$store.commit('ui/SET_NAVIGATION_DRAWER_VISIBILITY', value);
                }
            },

            user()
            {
                return this.$store.getters.app.user;
            }
        },

        created()
        {
            this.visible = !this.$vuetify.breakpoint.lgAndDown && !this.right;
        }
    }

</script>
