<template>
    <div>
        <v-btn icon flat @click="showDialog()" :disabled="! textIsSelected">
            <v-icon>insert_link</v-icon>
        </v-btn>
        <editor-dialog-add-link v-model="dialog" @update="setLinkUrl"></editor-dialog-add-link>
    </div>
</template>

<script>

    import MixinEditorCommand from '../Mixins/EditorCommand';
    import EditorDialogAddLink from "spa-skeleton/src/Components/Inputs/Editor/Dialogs/AddLink";

    export default {

        name: 'EditorButtonLink',

        components: {
            EditorDialogAddLink
        },

        mixins: [
            MixinEditorCommand
        ],

        props: {

            /**
             * Ref to the <editor> component.
             */
            editor: {
                type: Object,
                required: true
            }
        },

        data()
        {
            return {
                dialog: false
            }
        },

        computed: {

            textIsSelected()
            {
                let selection = this.editor.state.selection;

                return selection.$anchor.pos !== selection.$head.pos;
            }
        },

        methods: {

            /**
             * Show the add link dialog.
             */
            showDialog()
            {
                this.dialog = true;
            },

            /**
             * Set the link URL.
             *
             * @param url
             */
            setLinkUrl(url)
            {
                this.marks.link.command({href: url});
                this.focus();
            }
        },

        watch: {

            dialog()
            {
                if (!this.dialog) {
                    this.focus();
                }
            }
        }
    }

</script>
