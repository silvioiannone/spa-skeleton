<template>
    <editor @keydown.enter="stopEnterPropagation" :extensions="extensions" ref="editor"
            @update="updateModel">
        <v-toolbar dense class="menubar" slot="menubar" slot-scope="{commands, isActive}"
                   v-if="nodes && marks">
            <editor-buttons-formats :commands="commands"  :isActive="isActive">
            </editor-buttons-formats>
            <v-divider class="mr-2" vertical></v-divider>
            <editor-buttons-headings :commands="commands"  :isActive="isActive">
            </editor-buttons-headings>
            <v-divider class="mr-2" vertical></v-divider>
            <editor-buttons-lists :commands="commands"  :isActive="isActive">
            </editor-buttons-lists>
            <v-spacer></v-spacer>
            <editor-button-link :commands="commands"  :isActive="isActive" :editor="$refs.editor">
            </editor-button-link>
        </v-toolbar>
        <div slot="content" slot-scope="props" class="mt-3 editor__content">
            <div v-html="value"></div>
        </div>
    </editor>
</template>

<script>

    import { Editor } from 'tiptap';
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

    export default {

        name: 'InputEditor',

        components: {
            Editor,
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
        }
    }

</script>
