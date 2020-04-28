<template>
    <v-list-item :to="to" :exact="exact" :append="append">
        <v-list-item-avatar>
            <v-icon>{{ icon }}</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class ListItemNav extends Vue
    {
        /**
         * Whether the path shoulud be appended to the current route.
         */
        @Prop({ type: Boolean, default: false }) append: boolean;

        /**
         * Highlight the list item if the route (`to` prop) matches exactly.
         */
        @Prop({ type: Boolean, default: false }) exact: boolean;

        /**
         * Icon.
         */
        @Prop({ type: String, default: '' }) icon: string;

        /**
         * Title.
         */
        @Prop({ type: String, default: '' }) title: string;

        /**
         * To link destination.
         */
        @Prop({ type: String, default: '' }) to: string;
    }

    export default ListItemNav;

</script>
