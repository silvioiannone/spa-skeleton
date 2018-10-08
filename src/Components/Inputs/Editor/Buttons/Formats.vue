<template>
    <v-btn-toggle v-model="formats" multiple>
        <v-btn flat :active="marks.bold.active()" @click="marks.bold.command">
            <v-icon>format_bold</v-icon>
        </v-btn>
        <v-btn flat :active="marks.italic.active()" @click="marks.italic.command">
            <v-icon>format_italic</v-icon>
        </v-btn>
        <v-btn flat :active="marks.strike.active()" @click="marks.strike.command">
            <v-icon>format_strikethrough</v-icon>
        </v-btn>
        <v-btn flat :active="marks.underline.active()" @click="marks.underline.command">
            <v-icon>format_underline</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script>

    import MixinEditorCommand from '../Mixins/EditorCommand';

    export default {

        name: 'InputEditorButtonsFormats',

        mixins: [
            MixinEditorCommand
        ],

        data()
        {
            return {
                formats: []
            }
        }
    }

</script>
