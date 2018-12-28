<template>
    <v-card>
        <v-card-title class="headline" v-if="title.length">{{ title }}</v-card-title>
        <slot></slot>
    </v-card>
</template>

<script lang="ts">

    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class CardMain extends Vue
    {
        @Prop({ type: String, default: '' }) title: string;
    }

</script>
