<template>
    <v-navigation-drawer v-model="visible" class="scroll-y" persistent :right="right" app clipped
                         fixed :enable-resize-watcher="!right">
        <slot></slot>
    </v-navigation-drawer>
</template>

<script>

    export default
    {
        name: 'NavigationDrawerMain',

        props: {

            /**
             * Put the navigation drawer on the right side.
             */
            right: {
                type: Boolean,
                default: false
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
            this.visible = this.$vuetify.breakpoint.lgAndDown ? false : true;
        }
    }

</script>
