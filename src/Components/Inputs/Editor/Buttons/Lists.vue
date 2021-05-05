<template>
    <v-btn-toggle>
        <button-toolbar v-bind="buttonProps" icon="format_list_bulleted"
                        :active="isActive.bullet_list()" @click="commands.bullet_list"/>
        <button-toolbar v-bind="buttonProps" icon="format_list_numbered"
                        :active="isActive.ordered_list()" @click="commands.ordered_list"/>
    </v-btn-toggle>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import ButtonToolbar from '../Buttons/Toolbar.vue';
    import EditorCommand from '../Mixins/EditorCommand.vue';
    import ToolbarGroup from '../Mixins/ToolbarGroup.vue';

    @Component({
        components: {
            ButtonToolbar
        }
    })
    export class InputEditorButtonsLists extends Mixins(EditorCommand, ToolbarGroup)
    {
    }

    export default InputEditorButtonsLists;

</script>
