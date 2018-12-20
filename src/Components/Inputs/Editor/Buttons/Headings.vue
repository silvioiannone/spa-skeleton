<template>
    <v-btn-toggle>
        <v-btn flat @click="commands.heading({ level: 1 })"
               :class="{ 'v-btn--active': isActive.heading({ level: 1 }) }">
            <v-icon>mdi-format-header-1</v-icon>
        </v-btn>
        <v-btn flat @click="commands.heading({ level: 2 })"
               :class="{ 'v-btn--active': isActive.heading({ level: 2 }) }">
            <v-icon>mdi-format-header-2</v-icon>
        </v-btn>
        <v-btn flat @click="commands.heading({ level: 3 })"
               :active="{ 'v-btn--active' : isActive.heading({ level: 3 }) }">
            <v-icon>mdi-format-header-3</v-icon>
        </v-btn>
    </v-btn-toggle>
</template>

<script>

    import MixinEditorCommand from '../Mixins/EditorCommand';

    export default {

        name: 'InputEditorButtonsHeadings',

        mixins: [
            MixinEditorCommand
        ]
    }

</script>
