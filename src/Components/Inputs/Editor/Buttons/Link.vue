<template>
    <div>
        <v-btn icon flat @click="showDialog()" :disabled="! textIsSelected">
            <v-icon>insert_link</v-icon>
        </v-btn>
        <editor-dialog-add-link v-model="dialog" @update="setLinkUrl"></editor-dialog-add-link>
    </div>
</template>

<script lang="ts">

    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import { EditorCommand }                  from '../Mixins/EditorCommand.vue';
    import { EditorDialogAddLink }            from '../Dialogs/AddLink.vue';

    @Component({
        components: {
            EditorDialogAddLink
        }
    })
    export class EditorButtonLink extends Mixins(EditorCommand)
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
