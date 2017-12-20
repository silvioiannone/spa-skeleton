<template>
    <v-form @submit.prevent>
        <v-container fluid>
            <slot></slot>
            <v-layout row>
                <v-flex xs12>
                    <v-btn v-if="_cancellable" flat @click="cancel">Cancel</v-btn>
                    <button-submit :on-click="handleSubmit" color="primary"
                                   :disabled="$parent.errors.any()">
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
        ]
    }

</script>
