<template>
    <div>
        <editor-menu-bar :editor="editor" #default="{ commands, isActive }">
            <v-toolbar dense class="menubar">
                <editor-buttons-formats :commands="commands" :isActive="isActive">
                </editor-buttons-formats>
                <v-divider class="mr-2" vertical></v-divider>
                <editor-buttons-headings :commands="commands" :isActive="isActive">
                </editor-buttons-headings>
                <v-divider class="mr-2" vertical></v-divider>
                <editor-buttons-lists :commands="commands" :isActive="isActive">
                </editor-buttons-lists>
                <v-spacer></v-spacer>
                <editor-button-link :commands="commands" :isActive="isActive" :editor="editor">
                </editor-button-link>
            </v-toolbar>
        </editor-menu-bar>
        <editor-content class="mt-3 editor__content" :editor="editor" @update="updateModel"
                        @keydown.enter="stopEnterPropagation">
        </editor-content>
    </div>
</template>

<script>

    import { Editor, EditorContent, EditorMenuBar } from 'tiptap';
    import {
        BulletList,
        Heading,
        ListItem,
        OrderedList,
        Bold,
        Code,
        Italic,
        Link,
        Strike,
        Underline,
        History,
        Placeholder,
    } from 'tiptap-extensions';

    import EditorButtonsFormats from './Editor/Buttons/Formats';
    import EditorButtonsHeadings from './Editor/Buttons/Headings';
    import EditorButtonsLists from './Editor/Buttons/Lists';
    import EditorButtonLink from "spa-skeleton/src/Components/Inputs/Editor/Buttons/Link";

    export {

        name: 'InputEditor',

        components: {
            EditorContent,
            EditorMenuBar,
            EditorButtonLink,
            EditorButtonsFormats,
            EditorButtonsHeadings,
            EditorButtonsLists
        },

        props: {

            /**
             * Model.
             */
            value: {
                default: ''
            }
        },

        data()
        {
            return {
                editor: new Editor({
                    extensions: [
                        new BulletList(),
                        new Heading({ maxLevel: 3 }),
                        new ListItem(),
                        new OrderedList(),
                        new Bold(),
                        new Code(),
                        new Italic(),
                        new Link(),
                        new Strike(),
                        new Underline(),
                        new History(),
                        new Placeholder(),
                    ],
                    onUpdate: this.updateModel,
                    content: this.value
                })
            }
        },

        methods: {

            /**
              * Stop the propagation of the enter keypress event.
              *
              * This is needed in order to avoid accidentally submitting the form containing this
              * input element.
              *
              * @param event
              */
            stopEnterPropagation(event)
            {
                event.preventDefault();
            },

            /**
              * Emit the update event.
              */
            updateModel(content)
            {
                this.$emit('input', content.getHTML());
            }
        },

        beforeDestroy()
        {
            this.editor.destroy()
        },
    }

</script>
