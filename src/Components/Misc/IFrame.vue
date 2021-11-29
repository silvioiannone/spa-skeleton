<template>
    <iframe :frameborder="frameBorder" ref="iframe" @load="handleOnLoad"/>
</template>

<style lang="sass">

    iframe
        width: 100%
        height: 100%

</style>

<script lang="ts">

    import Vue                        from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';

    @Component
    export class IFrame extends Vue
    {
        /**
         * Frame border attribute.
         */
        @Prop({ type: Number, default: 0 }) frameBorder: number;

        /**
         * Iframe content.
         */
        @Prop({ type: String, required: true }) content: string;

        /**
         * Handle the iframe's `onload` event.
         */
        handleOnLoad(): void
        {
            this.$emit('load', this.$refs.iframe);
        }

        @Watch('content', { immediate: true })
        onContentChange()
        {
            this.$nextTick(() => {
                let iframeWindow = (<HTMLIFrameElement>this.$el).contentWindow;
                if (iframeWindow) {
                    let frame = iframeWindow.document;
                    frame.open();
                    frame.write(this.content);
                    frame.close();
                }
            });
        }
    }

    export default IFrame;

</script>
