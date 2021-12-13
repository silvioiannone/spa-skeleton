<template>
    <vue-markdown class="markdown-body" :source="source"/>
</template>

<script lang="ts">

import VueMarkdown from 'vue-markdown';

export default {

    name: 'Markdown',

    components: {
        VueMarkdown
    },

    props: {
        /**
         * Markdown to be displayed.
         */
        source: { type: String, default: '' }
    }
}

</script>
