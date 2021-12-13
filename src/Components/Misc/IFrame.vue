<template>
    <iframe :frameborder="frameBorder" ref="iframe" @load="handleOnLoad"/>
</template>

<style lang="sass">

    iframe
        width: 100%
        height: 100%

</style>

<script lang="ts">

export default {

    name: 'IFrame',

    props: {
        /**
         * Frame border attribute.
         */
        frameBorder: { type: Number, default: 0 },

        /**
         * Iframe content.
         */
        content: { type: String, required: true }
    },

    methods: {
        /**
         * Handle the iframe's `onload` event.
         */
        handleOnLoad(): void
        {
            this.$emit('load', this.$refs.iframe);
        }
    },

    mounted()
    {
        this.$watch('content', () => {
            this.$nextTick(() => {
                let iframeWindow = (<HTMLIFrameElement>this.$el).contentWindow;
                if (iframeWindow) {
                    let frame = iframeWindow.document;
                    frame.open();
                    frame.write(this.content);
                    frame.close();
                }
            });
        }, { immediate: true })
    }
}

</script>
