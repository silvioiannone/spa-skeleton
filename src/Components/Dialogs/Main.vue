<template>
    <v-dialog v-model="model" :max-width="maxWidth">
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
            },

            maxWidth: {
                type: Number,
                default: 500
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
