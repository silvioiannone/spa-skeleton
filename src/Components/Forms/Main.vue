<template>
    <v-form @submit.prevent>
        <v-container fluid grid-list-lg class="pa-0">
            <v-layout row wrap>
                <slot></slot>
                <v-flex xs12 :class="{'text-xs-center': centerActions}">
                    <button-submit :on-click="handleSubmit" color="primary"
                                   :disabled="hasErrors || !canSubmit">
                        {{ submitText }}
                    </button-submit>
                    <slot name="actions"></slot>
                    <v-btn v-if="_cancellable" flat @click="cancel">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>

    import Form from '../Mixins/Form.vue';

    export default {

        name: 'FormMain',

        mixins: [
            Form
        ],

        computed: {

            canSubmit()
            {
                return (typeof this.$parent.canSubmit !== 'undefined') ?
                    this.$parent.canSubmit : true;
            }
        }
    }

</script>
