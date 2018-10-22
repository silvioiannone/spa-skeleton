<template>
    <v-chip :close="close" @input="bubbleInput">
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
