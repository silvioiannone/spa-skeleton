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

<script>

    import MixinEditorCommand from '../Mixins/EditorCommand';

    export {

        name: 'InputEditorButtonsLists',

        mixins: [
            MixinEditorCommand
        ]
    }

</script>
