<template>
    <vue-markdown class="markdown-body" :source="source"></vue-markdown>
</template>

<script>

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
            source: {
                type: String,
                default: ''
            }
        }
    }

</script>
