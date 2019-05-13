<template>
    <dialog-card v-bind="getProps()" v-on="getOn()" title="Add link">
        <v-text-field label="URL" v-model="url"></v-text-field>
        <v-btn color="primary" :disabled="! url.length" @click="save">Add link</v-btn>
    </dialog-card>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Wrapper }           from '../../../Mixins/Wrapper.vue';
    import { DialogCard }        from '../../../Dialogs/Card.vue';

    @Component({
        components: {
            DialogCard,
        }
    })
    export class EditorDialogAddLink extends Mixins(Wrapper)
    {
        __component = DialogCard;

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
