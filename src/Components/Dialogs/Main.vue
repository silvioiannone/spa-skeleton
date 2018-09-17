<template>
    <v-dialog v-model="model" :max-width="maxWidth" :persistent="persistent"
              :fullscreen="_fullscreen">
        <slot></slot>
        <v-btn icon @click="model = false" v-if="_fullscreen" class="dialog--button-close">
            <v-icon color="primary">close</v-icon>
        </v-btn>
    </v-dialog>
</template>

<script>

    export default {

        name: 'DialogMain',

        props: {

            value: {
                type: Boolean,
                default: false
            },

            maxWidth: {
                type: Number,
                default: 500
            },

            persistent: {
                type: Boolean,
                default: false
            },

            /**
             * Display a fullscreen dialog.
             */
            fullscreen: {
                type: Boolean,
                default: false
            }
        },

        computed: {

            /**
             * Determines the dialog's visibility.
             */
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            },

            _fullscreen()
            {
                return this.fullscreen || this.$vuetify.breakpoint.xs;
            }
        }
    }

</script>
