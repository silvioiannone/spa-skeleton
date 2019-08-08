<template>
    <v-btn-toggle>
        <v-btn text :value="0" @click="commands.bold"
               :class="{ 'v-btn--active': isActive.bold() }">
            <v-icon>format_bold</v-icon>
        </v-btn>
        <v-btn text :value="1" @click="commands.italic"
               :class="{ 'v-btn--active': isActive.italic() }">
            <v-icon>format_italic</v-icon>
        </v-btn>
        <v-btn text :value="2" @click="commands.strike"
               :class="{ 'v-btn--active': isActive.strike() }">
            <v-icon>format_strikethrough</v-icon>
        </v-btn>
        <v-btn text :value="3" @click="commands.underline"
               :class="{ 'v-btn--active': isActive.underline() }">
            <v-icon>format_underline</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { EditorCommand }     from '../Mixins/EditorCommand.vue';

    @Component
    export class InputEditorButtonsFormats extends Mixins(EditorCommand)
    {
    }

    export default InputEditorButtonsFormats;

</script>
