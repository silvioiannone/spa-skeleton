<template>
    <v-btn-toggle>
        <v-btn flat :value="0" @click="marks.bold.command"
               :class="{ 'v-btn--active': marks.bold.active() }">
            <v-icon>format_bold</v-icon>
        </v-btn>
        <v-btn flat :value="1" @click="marks.italic.command"
               :class="{ 'v-btn--active': marks.italic.active() }">
            <v-icon>format_italic</v-icon>
        </v-btn>
        <v-btn flat :value="2" @click="marks.strike.command"
               :class="{ 'v-btn--active': marks.strike.active() }">
            <v-icon>format_strikethrough</v-icon>
        </v-btn>
        <v-btn flat :value="3" @click="marks.underline.command"
               :class="{ 'v-btn--active': marks.underline.active() }">
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
        ]
    }

</script>
