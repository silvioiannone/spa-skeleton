<template>
    <v-btn-toggle v-model="heading">
        <v-btn flat @click="nodes.heading.command({ level: 1 })"
               :active="nodes.heading.active({ level: 1 })">
            <v-icon>mdi-format-header-1</v-icon>
        </v-btn>
        <v-btn flat @click="nodes.heading.command({ level: 2 })"
               :active="nodes.heading.active({ level: 2 })">
            <v-icon>mdi-format-header-2</v-icon>
        </v-btn>
        <v-btn flat @click="nodes.heading.command({ level: 3 })"
               :active="nodes.heading.active({ level: 3 })">
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
        ],

        data()
        {
            return {
                heading: null
            }
        }
    }

</script>
