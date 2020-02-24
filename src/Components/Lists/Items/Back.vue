<template>
    <v-list-item @click="handleClick">
        <v-list-item-avatar>
            <v-icon>arrow_back</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
                <template v-if="title.length">{{ title }}</template>
            </v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class ListItemBack extends Vue
    {
        /**
         * Highlight the list item only if the route matches exactly.
         */
        @Prop({ type: Boolean, default: true }) exact: boolean;

        /**
         * Title displayed by the card.
         */
        @Prop({ type: String, default: '' }) title: string;

        /**
         * Link destination.
         */
        @Prop({ type: String, default: '' }) to: string;

        get canGoBack(): boolean
        {
            return !! document.referrer.length;
        }

        /**
         * Handle the click on the button.
         */
        handleClick(): void
        {
            this.$navigator.push(this.to);
        }
    }

    export default ListItemBack;

</script>
