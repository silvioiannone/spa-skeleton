<template>
    <vue-markdown class="markdown-body" :source="source"/>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import VueMarkdown              from 'vue-markdown';

    @Component({
        components: {
            VueMarkdown
        }
    })
    export class Markdown extends Vue
    {
        /**
         * Markdown to be displayed.
         */
        @Prop({type: String, default: ''}) source: string;
    }

    export default Markdown;

</script>
