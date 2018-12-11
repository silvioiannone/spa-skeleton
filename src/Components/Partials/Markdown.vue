<template>
    <vue-markdown class="markdown-body" :source="source"></vue-markdown>
</template>

<script lang="ts">

    import Vue         from 'vue';
    import VueMarkdown from 'vue-markdown';

    export default Vue.extend({

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
    });

</script>
