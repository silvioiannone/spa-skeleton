<template>
    <div>
        <button-toolbar v-bind="buttonProps" icon="insert_link" :disabled="! textIsSelected"
                        @click="showDialog()"/>
        <editor-dialog-add-link v-model="dialog" @update="setLinkUrl"/>
    </div>
</template>

<script lang="ts">

    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import { ButtonToolbar }                  from '../Buttons/Toolbar.vue';
    import { EditorDialogAddLink }            from '../Dialogs/AddLink.vue';
    import { EditorCommand }                  from '../Mixins/EditorCommand.vue';
    import { ToolbarGroup }                   from '../Mixins/ToolbarGroup.vue';

    @Component({
        components: {
            ButtonToolbar,
            EditorDialogAddLink
        }
    })
    export class EditorButtonLink extends Mixins(EditorCommand, ToolbarGroup)
    {
        /**
         * Ref to the <editor> component.
         */
        @Prop({ type: Object, required: true }) editor: any;

        dialog: boolean = false;

        get textIsSelected(): boolean
        {
            let selection = this.editor.state.selection;

            return selection.$anchor.pos !== selection.$head.pos;
        }

        /**
         * Show the add link dialog.
         */
        showDialog(): void
        {
            this.dialog = true;
        }

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

        @Watch('dialog')
        onDialogChange(): void
        {
            if (!this.dialog) {
                this.editor.focus();
            }
        }
    }

    export default EditorButtonLink;

</script>
