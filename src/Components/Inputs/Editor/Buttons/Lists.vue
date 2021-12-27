<template>
    <v-btn-toggle>
        <button-toolbar v-bind="buttonProps" icon="format_list_bulleted"
                        :active="isActive.bullet_list()" @click="commands.bullet_list"/>
        <button-toolbar v-bind="buttonProps" icon="format_list_numbered"
                        :active="isActive.ordered_list()" @click="commands.ordered_list"/>
    </v-btn-toggle>
</template>

<script lang="ts">

import ButtonToolbar from '../Buttons/Toolbar.vue';
import EditorCommand from '../Mixins/EditorCommand.vue';
import ToolbarGroup from '../Mixins/ToolbarGroup.vue';

export default {

    name: 'InputEditorButtonsLists',

    mixins: [EditorCommand, ToolbarGroup],

    components: {
        ButtonToolbar
    }
}

</script>
