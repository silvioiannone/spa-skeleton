<template>
    <iframe :frameborder="frameBorder" :src="_content"></iframe>
</template>

<script lang="ts">

    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export default class IFrame extends Vue
    {
        /**
         * Frame border attribute.
         */
        @Prop({ type: Number, default: 0 }) frameBorder: number;

        /**
         * Iframe content.
         */
        @Prop({ type: String, required: true }) content: string;

        get _content()
        {
            return 'data:text/html;charset=utf-8,' + escape(this.content);
        }
    }

</script>
