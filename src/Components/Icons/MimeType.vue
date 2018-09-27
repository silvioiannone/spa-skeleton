<template>
    <v-icon>{{ icon }}</v-icon>
</template>

<script>

    export default {

        name: 'IconMimeType',

        props: {

            /**
             * Mime type.
             */
            mime: {
                type: String,
                required: true
            }
        },

        data()
        {
            return {
                mimeTypes: {},
                categoryToIcon: {
                    application: 'mdi-application',
                    audio: 'mdi-file-music',
                    image: 'mdi-file-image',
                    text: 'mdi-file-document',
                    video: 'mdie-file-video'
                }
            }
        },

        computed: {

            icon()
            {
                let result = /(.+)\/(.+)/.exec(this.mime);
                let category = result[1];
                let subtype = result[2];

                return this.categoryToIcon[category] || 'mdi-file';
            }
        }
    }

</script>