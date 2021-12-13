<template>
    <v-btn-toggle>
        <button-toolbar v-bind="buttonProps" :value="0" icon="format_bold" :active="isActive.bold()"
                        @click="commands.bold"/>
        <button-toolbar v-bind="buttonProps" :value="1" icon="format_italic"
                        :active="isActive.italic()" @click="commands.italic"/>
        <button-toolbar v-bind="buttonProps" :value="2" icon="format_strikethrough"
                        :active="isActive.strike()" @click="commands.strike"/>
        <button-toolbar v-bind="buttonProps" :value="3" icon="format_underline"
                        :active="isActive.underline()" @click="commands.underline"/>
    </v-btn-toggle>
</template>

<script lang="ts">

import ButtonToolbar from '../Buttons/Toolbar.vue';
import EditorCommand from '../Mixins/EditorCommand.vue';
import ToolbarGroup from '../Mixins/ToolbarGroup.vue';

export default {

    name: 'InputEditorButtonsFormats',

    mixins: [EditorCommand, ToolbarGroup],

    components: {
        ButtonToolbar
    }
}

</script>
