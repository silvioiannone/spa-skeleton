<template>
    <v-form @submit.prevent>
        <v-container fluid grid-list-lg class="pa-0">
            <slot></slot>
            <v-layout row>
                <v-flex :class="{'text-xs-center': centerActions}">
                    <slot name="actions"></slot>
                    <v-btn v-if="_cancellable" flat @click="cancel">Cancel</v-btn>
                    <button-submit :on-click="handleSubmit" color="primary"
                                   :disabled="$parent.errors.any() || !canSubmit">
                        {{ submitText }}
                    </button-submit>
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
                return (typeof this.$parent.canSubmit !== 'undefined') ? this.$parent.canSubmit : true;
            }
        }
    }

</script>
