<template>
    <v-chip v-bind="$props" v-on="$listeners">
        <slot/>
    </v-chip>
</template>

<script lang="ts">

import Chip from '../Mixins/Chip.vue';

export default {

    name: 'ChipMain',

    mixins: [Chip]
}

</script>
