<template>
    <v-dialog v-model="value" max-width="500">
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

        watch: {

            value(value)
            {
                this.$emit('input', value);
            }
        }
    }

</script>
