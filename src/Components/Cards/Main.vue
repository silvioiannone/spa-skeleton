<template>
    <v-card>
        <v-card-title class="headline" v-if="title.length">
            {{ title }}
            <v-spacer></v-spacer>
            <slot name="title-actions"></slot>
        </v-card-title>
        <slot></slot>
    </v-card>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class CardMain extends Vue
    {
        /**
         * Card title.
         */
        @Prop({ type: String, default: '' }) title: string;
    }

    export default CardMain;

</script>
