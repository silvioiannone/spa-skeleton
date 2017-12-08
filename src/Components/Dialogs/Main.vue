<template>
    <v-dialog v-model="model" max-width="500">
        <slot></slot>
    </v-dialog>
</template>

<script>

    export default {

        name: 'DialogMain',

        props: {

            value: {
                type: Boolean,
                default: false
            }
        },

        /**
         * Determines the dialog's visibility.
         */
        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        }
    }

</script>
