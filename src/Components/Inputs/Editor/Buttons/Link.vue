<template>
    <div>
        <button-toolbar v-bind="buttonProps" icon="insert_link" :disabled="! textIsSelected"
                        @click="showDialog()"/>
        <editor-dialog-add-link v-model="dialog" @update="setLinkUrl"/>
    </div>
</template>

<script lang="ts">

import ButtonToolbar from '../Buttons/Toolbar.vue';
import EditorDialogAddLink from '../Dialogs/AddLink.vue';
import EditorCommand from '../Mixins/EditorCommand.vue';
import ToolbarGroup from '../Mixins/ToolbarGroup.vue';

export default {

    name: 'EditorButtonLink',

    mixins: [EditorCommand, ToolbarGroup],

    components: {
        ButtonToolbar,
        EditorDialogAddLink
    },

    props: {

        /**
         * Ref to the <editor> component.
         */
        editor: { type: Object, required: true }
    },

    data() {
        return {
            dialog: false
        }
    },

    computed: {
        textIsSelected(): boolean
        {
            let selection = this.editor.state.selection;

            return selection.$anchor.pos !== selection.$head.pos;
        }
    },

    methods: {

        /**
         * Show the add link dialog.
         */
        showDialog(): void
        {
            this.dialog = true;
        },

        /**
         * Set the link URL.
         *
         * @param url
         */
        setLinkUrl(url: string): void
        {
            this.commands.link({href: url});
            this.editor.focus();
        }
    },

    watch: {
        dialog(): void
        {
            if (!this.dialog) {
                this.editor.focus();
            }
        }
    }
}

</script>
