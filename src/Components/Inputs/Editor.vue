<template>
    <div class="input__editor">
        <editor-menu-bar :editor="editor" #default="{ commands, isActive }">
            <v-toolbar dense class="menubar elevation-0">
                <editor-buttons-formats :commands="commands" :isActive="isActive">
                </editor-buttons-formats>
                <v-divider class="mr-2" vertical/>
                <editor-buttons-headings :commands="commands" :isActive="isActive">
                </editor-buttons-headings>
                <v-divider class="mr-2" vertical/>
                <editor-buttons-lists :commands="commands" :isActive="isActive">
                </editor-buttons-lists>
                <v-spacer/>
                <editor-button-link :commands="commands" :isActive="isActive" :editor="editor">
                </editor-button-link>
            </v-toolbar>
        </editor-menu-bar>
        <editor-content class="mt-3 input__editor-content" :editor="editor" @update="updateModel"
                        @keydown.enter="stopEnterPropagation">
        </editor-content>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';

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

    import EditorButtonsFormats  from './Editor/Buttons/Formats.vue';
    import EditorButtonsHeadings from './Editor/Buttons/Headings.vue';
    import EditorButtonsLists    from './Editor/Buttons/Lists.vue';
    import EditorButtonLink      from './Editor/Buttons/Link.vue';

    @Component({
        components: {
            EditorContent,
            EditorMenuBar,
            EditorButtonLink,
            EditorButtonsFormats,
            EditorButtonsHeadings,
            EditorButtonsLists
        }
    })
    export class InputEditor extends Vue {
        /**
         * Model.
         */
        @Prop({default: ''}) value: any;

        editor: any = new Editor({
            extensions: [
                new BulletList(),
                new Heading({maxLevel: 3}),
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
            onBlur: this.onBlur,
            content: this.value
        });

        /**
         * Stop the propagation of the enter keypress event.
         *
         * This is needed in order to avoid accidentally submitting the form containing this
         * input element.
         *
         * @param event
         */
        stopEnterPropagation(event: any): void {
            event.preventDefault();
        }

        /**
         * Emit the update event.
         */
        updateModel(content: any): void {
            this.$emit('input', content.getHTML());
        }

        /**
         * Handle the `blur` event.
         */
        onBlur(event: any): void
        {
            this.$emit('blur');
        }

        beforeDestroy(): void {
            this.editor.destroy()
        }
    }

    export default InputEditor;

</script>
