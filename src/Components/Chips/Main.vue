<template>
    <v-chip v-bind="$props" v-on="$listeners">
        <slot/>
    </v-chip>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Chip }              from '../Mixins/Chip.vue';

    @Component
    export class ChipMain extends Mixins(Chip)
    {
    }

    export default ChipMain;

</script>
