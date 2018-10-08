<template>
    <editor class="editor" @keydown.enter="stopEnterPropagation" :extensions="extensions"
            ref="editor" @update="bubbleUpdateEvent">
        <v-toolbar dense class="menubar" slot="menubar" slot-scope="{nodes, marks, focus}"
                   v-if="nodes && marks">
            <editor-buttons-formats :nodes="nodes" :marks="marks" :focus="focus">
            </editor-buttons-formats>
            <v-divider class="mr-2" vertical></v-divider>
            <editor-buttons-headings :nodes="nodes" :marks="marks" :focus="focus">
            </editor-buttons-headings>
            <v-divider class="mr-2" vertical></v-divider>
            <editor-buttons-lists :nodes="nodes" :marks="marks" :focus="focus">
            </editor-buttons-lists>
            <v-spacer></v-spacer>
            <editor-button-link :nodes="nodes" :marks="marks" :focus="focus" :editor="$refs.editor">
            </editor-button-link>
        </v-toolbar>
        <div slot="content" slot-scope="props" class="mt-3 editor__content">
            <slot name="content"></slot>
        </div>
    </editor>
</template>

<script>

    import { Editor } from 'tiptap';
    import {
        // Nodes
        BulletListNode,
        HeadingNode,
        ListItemNode,
        OrderedListNode,

        // Marks
        BoldMark,
        CodeMark,
        ItalicMark,
        LinkMark,
        StrikeMark,
        UnderlineMark,

        // General Extensions
        HistoryExtension,
        PlaceholderExtension,
    } from 'tiptap-extensions';

    import EditorButtonsFormats from './Editor/Buttons/Formats';
    import EditorButtonsHeadings from './Editor/Buttons/Headings';
    import EditorButtonsLists from './Editor/Buttons/Lists';
    import EditorButtonLink from "spa-skeleton/src/Components/Inputs/Editor/Buttons/Link";

    export default {

        name: 'InputEditor',

        components: {
            EditorButtonLink,
            Editor,
            EditorButtonsFormats,
            EditorButtonsHeadings,
            EditorButtonsLists
        },

        data()
        {
            return {
                buttonGroups: {
                    headings: [],
                    lists: []
                },
                extensions: [
                    new BulletListNode(),
                    new HeadingNode({ maxLevel: 3 }),
                    new ListItemNode(),
                    new OrderedListNode(),
                    new BoldMark(),
                    new CodeMark(),
                    new ItalicMark(),
                    new LinkMark(),
                    new StrikeMark(),
                    new UnderlineMark(),
                    new HistoryExtension(),
                    new PlaceholderExtension(),
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
            bubbleUpdateEvent(content)
            {
                this.$emit('update', content.getHTML());
            }
        }
    }

</script>
