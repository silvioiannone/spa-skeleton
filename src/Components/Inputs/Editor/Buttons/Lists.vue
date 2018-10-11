<template>
    <v-btn-toggle>
        <v-btn flat @click="nodes.bullet_list.command"
               :class="{ 'v-btn--active' : nodes.bullet_list.active() }">
            <v-icon>format_list_bulleted</v-icon>
        </v-btn>
        <v-btn flat @click="nodes.ordered_list.command"
               :class="{ 'v-btn--active' : nodes.ordered_list.active() }">
            <v-icon>format_list_numbered</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script>

    import MixinEditorCommand from '../Mixins/EditorCommand';

    export default {

        name: 'InputEditorButtonsLists',

        mixins: [
            MixinEditorCommand
        ]
    }

</script>
