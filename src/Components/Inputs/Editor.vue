<template>
    <div :class="classes">
        <editor-menu-bar :editor="editor" #default="{ commands, isActive }">
            <v-toolbar dense class="menubar elevation-0">
                <editor-buttons-formats v-bind="toolbar" :commands="commands" :isActive="isActive"/>
                <editor-buttons-headings v-bind="toolbar" :commands="commands" :isActive="isActive"
                                         class="ml-1"/>
                <editor-buttons-lists v-bind="toolbar" :commands="commands" :isActive="isActive"
                                      class="ml-1"/>
                <v-spacer/>
                <editor-button-link :commands="commands" :isActive="isActive" :editor="editor"/>
            </v-toolbar>
        </editor-menu-bar>
        <editor-content class="mt-3 input__editor-content" :editor="editor" @update="updateModel"
                        @keydown.enter="stopEnterPropagation"/>
    </div>
</template>

<script lang="ts">

    import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
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
    export class InputEditor extends Vue
    {
        /**
         * Model.
         */
        @Prop({default: ''}) value: any;

        /**
         * Toolbar settings.
         */
        @Prop({ type: Object, default: () => ({
                small: false
        })}) toolbar: any;

        contentIsSet: boolean = false;

        editor: any = null;

        isFocused: boolean = false;

        get classes(): any
        {
            return [
                'theme--light',
                'input__editor',
                'input__editor--outlined',
                { 'input__editor--focused' : this.isFocused }
            ]
        }

        /**
         * Handle the `focus` event.
         */
        onFocus(event: any): void
        {
            this.$emit('focus');
            (this.$el.querySelector('.input__editor-content') as HTMLElement)
                .style.borderColor = (this.$vuetify.theme.currentTheme.primary as string);
            this.isFocused = true;
        }

        /**
         * Handle the `blur` event.
         */
        onBlur(event: any): void
        {
            this.$emit('blur');
            (this.$el.querySelector('.input__editor-content') as HTMLElement)
                .style.borderColor = (this.$vuetify.theme.currentTheme.secondary as string);
            this.isFocused = false;
        }

        /**
         * Stop the propagation of the enter keypress event.
         *
         * This is needed in order to avoid accidentally submitting the form containing this
         * input element.
         *
         * @param event
         */
        stopEnterPropagation(event: any): void
        {
            event.preventDefault();
        }

        /**
         * Emit the update event.
         */
        updateModel(content: any): void {
            this.$emit('input', content.getHTML());
        }

        @Watch('value', { immediate: true })
        onValueChange(): void
        {
            if (! this.editor || this.contentIsSet) {
                return;
            }

            this.contentIsSet = true;
            this.editor.setContent(this.value);
        }

        mounted(): void
        {
            this.editor = new Editor({
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
                onFocus: this.onFocus,
                onBlur: this.onBlur,
                content: this.value
            });
        }

        beforeDestroy(): void
        {
            this.editor.destroy();
        }
    }

    export default InputEditor;

</script>
