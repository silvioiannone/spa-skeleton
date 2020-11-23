<template>
    <dialog-card v-bind="$props" v-on="$listeners" title="Add link">
        <v-text-field label="URL" v-model="url"/>
        <v-btn color="primary" :disabled="! url.length" @click="save">Add link</v-btn>
    </dialog-card>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { DialogCard } from '../../../Dialogs/Card.vue';

    @Component({
        components: {
            DialogCard,
        }
    })
    export class EditorDialogAddLink extends Mixins(DialogCard)
    {
        url: string = '';

        save(): void
        {
            this.$emit('update', this.url);
            this.$emit('input', false);
            this.url = '';
        }
    }

    export default EditorDialogAddLink;

</script>
