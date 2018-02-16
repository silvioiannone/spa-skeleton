<template>
    <vue-markdown class="markdown-body">
        <slot></slot>
    </vue-markdown>
</template>

<script>

    import VueMarkdown from 'vue-markdown';

    export default {

        name: 'Markdown',

        components: {
            VueMarkdown
        }
    }

</script>
