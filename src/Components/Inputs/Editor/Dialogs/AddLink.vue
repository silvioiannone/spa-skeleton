<template>
    <dialog-card v-bind="getProps()" v-on="getOn()" title="Add link">
        <v-text-field label="URL" v-model="url"></v-text-field>
        <v-btn color="primary" :disabled="! url.length" @click="save">Add link</v-btn>
    </dialog-card>
</template>

<script>

    import MixinWrapper from '../../../Mixins/Wrapper';
    import DialogCard from "spa-skeleton/src/Components/Dialogs/Card";

    export {

        name: 'EditorDialogAddLink',

        components: {
            DialogCard,
        },

        mixins: [
            MixinWrapper
        ],

        data()
        {
            return {
                __component: DialogCard,
                url: ''
            }
        },

        methods: {

            save()
            {
                this.$emit('update', this.url);
                this.$emit('input', false);
                this.url = '';
            }
        }
    }

</script>
