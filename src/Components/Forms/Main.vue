<template>
    <v-form @submit.prevent>
        <v-container grid-list-lg fluid>
            <slot></slot>
            <v-layout row>
                <v-flex>
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
