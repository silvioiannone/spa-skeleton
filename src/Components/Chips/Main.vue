<template>
    <v-chip :close="close"
            :label="label"
            :outline="outline"
            :small="small"
            :color="color"
            @input="bubbleInput">
        <slot></slot>
    </v-chip>
</template>

<script>

    import Chip from '../Mixins/Chip';

    export default {

        name: 'ChipMain',

        mixins: [
            Chip
        ],

        methods: {

            /**
             * Bubble input event.
             */
            bubbleInput(value)
            {
                this.$emit('input', value);
            }
        }
    }

</script>
