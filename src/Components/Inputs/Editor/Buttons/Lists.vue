<template>
    <v-btn-toggle>
        <v-btn flat @click="commands.bullet_list"
               :class="{ 'v-btn--active' : isActive.bullet_list() }">
            <v-icon>format_list_bulleted</v-icon>
        </v-btn>
        <v-btn flat @click="commands.ordered_list"
               :class="{ 'v-btn--active' : isActive.ordered_list() }">
            <v-icon>format_list_numbered</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { EditorCommand }     from '../Mixins/EditorCommand.vue';

    @Component
    export class InputEditorButtonsLists extends Mixins(EditorCommand)
    {
    }

    export default InputEditorButtonsLists;

</script>
