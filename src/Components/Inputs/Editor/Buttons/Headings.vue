<template>
    <v-btn-toggle>
        <button-toolbar v-bind="buttonProps" icon="mdi-format-header-1"
                        :active="isActive.heading({ level: 1 })"
                        @click="commands.heading({ level: 1 })"/>
        <button-toolbar v-bind="buttonProps" icon="mdi-format-header-2"
                        :active="isActive.heading({ level: 2 })"
                        @click="commands.heading({ level: 2 })"/>
        <button-toolbar v-bind="buttonProps" icon="mdi-format-header-3"
                        :active="isActive.heading({ level: 3 })"
                        @click="commands.heading({ level: 3 })"/>
    </v-btn-toggle>
</template>

<script lang="ts">

import ButtonToolbar from '../Buttons/Toolbar.vue';
import EditorCommand from '../Mixins/EditorCommand.vue';
import ToolbarGroup from '../Mixins/ToolbarGroup.vue';

export default {

    name: 'InputEditorButtonsHeadings',

    mixins: [EditorCommand, ToolbarGroup],

    components: {
        ButtonToolbar
    }
}

</script>
