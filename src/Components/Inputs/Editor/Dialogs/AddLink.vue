<template>
    <dialog-card v-bind="$props" v-on="$listeners" title="Add link">
        <v-text-field label="URL" v-model="url"/>
        <v-btn color="primary" :disabled="! url.length" @click="save">Add link</v-btn>
    </dialog-card>
</template>

<script lang="ts">

import DialogCard from '../../../Dialogs/Card.vue';

export default {

    name: 'EditorDialogAddLink',

    mixins: [DialogCard],

    components: {
        DialogCard
    },

    data() {
        return {
            url: ''
        }
    },

    methods: {

        save(): void
        {
            this.$emit('update', this.url);
            this.$emit('input', false);
            this.url = '';
        }
    }
}

</script>
