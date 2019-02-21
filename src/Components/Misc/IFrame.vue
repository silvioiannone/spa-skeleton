<template>
    <iframe :frameborder="frameBorder"></iframe>
</template>

<style lang="stylus">

    iframe
        width 100%
        height 100%

</style>

<script lang="ts">

    import Vue                        from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';

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

        @Watch('content', { immediate: true })
        onContentChange()
        {
            this.$nextTick(() =>
            {
                let frame = (<HTMLIFrameElement>this.$el).contentWindow.document;
                frame.open();
                frame.write(this.content);
                frame.close();
            });
        }
    }

</script>
