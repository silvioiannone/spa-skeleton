<template>
    <v-chip :close="close" :label="label" :outlined="outlined" :small="small" :color="color"
            @input="bubbleInput" :large="large" :x-large="xLarge">
        <slot/>
    </v-chip>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Chip }              from '../Mixins/Chip.vue';

    @Component
    export class ChipMain extends Mixins(Chip)
    {
        bubbleInput(value: any)
        {
            this.$emit('input', value);
        }
    }

    export default ChipMain;

</script>
