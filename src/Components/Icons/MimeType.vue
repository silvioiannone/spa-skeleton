<template>
    <v-icon>{{ icon }}</v-icon>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export class IconMimeType extends Vue
    {
        /**
         * Mime type.
         */
        @Prop({ type: String, required: true }) mime: string;

        categoryToIcon = {
            application: 'mdi-application',
            audio: 'mdi-file-music',
            image: 'mdi-file-image',
            text: 'mdi-file-document',
            video: 'mdi-file-video'
        };

        get icon(): string
        {
            let result = /(.+)\/(.+)/.exec(this.mime);
            if (result) {
                let category = result[1];
                let subtype = result[2];

                return this.categoryToIcon[category] || 'mdi-file';
            } else {
                return 'mdi-file';
            }
        }
    }

    export default IconMimeType;

</script>
