<template>
    <v-icon>{{ icon }}</v-icon>
</template>

<script lang="ts">

export default {

    name: 'IconMimeType',

    props: {
        /**
         * Mime type.
         */
         mime: { type: String, required: true }
    },

    data() {
        return {
            categoryToIcon: {
                application: 'mdi-application',
                audio: 'mdi-file-music',
                image: 'mdi-file-image',
                text: 'mdi-file-document',
                video: 'mdi-file-video'
            }
        }
    },

    computed: {

        icon(): string
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
}

</script>
