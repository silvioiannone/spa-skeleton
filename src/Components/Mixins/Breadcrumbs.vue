<template>
    
</template>

<script lang="ts">
    
    import Vue           from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    
    @Component
    export default class Breadcrumbs extends Vue
    {
        /**
         * An array containing the items that will be displayed.
         */
        @Prop({ type: Array, default: () => []}) items: Array<any>

        /**
         * Specifies the dividing character.
         */
        @Prop({ type: String, default: '/' }) divider: string;
    }
    
</script>

<script2>

    export default {

        props: {

            /**
             * An array containing the items that will be displayed.
             */
            items: {
                type: Array,
                default: () => []
            },

            /**
             * Specifies the dividing character.
             */
            divider: {
                type: String,
                divider: '/'
            }
        }
    }

</script2>
