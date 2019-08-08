<template>
    <v-form @submit.prevent v-model="$data._vFormValid">
        <v-container fluid grid-list-lg class="pa-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-alert type="error" :value="errors.any('_server')">
                        <template v-if="errors.all('_server')[0]">
                            {{ errors.all('_server')[0] }}
                        </template>
                    </v-alert>
                </v-flex>
                <slot></slot>
                <v-flex xs12 :class="{'text-center': centerActions}" v-if="submit">
                    <button-submit :on-click="handleSubmit" color="primary"
                                   :disabled="hasErrors">
                        {{ submitText || $t('form.submit') }}
                    </button-submit>
                    <slot name="actions"></slot>
                    <v-btn v-if="cancellable" text @click.stop="cancel">
                        {{ $t('form.cancel') }}
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Form }              from '../Mixins/Form.vue';

    @Component
    export class FormMain extends Mixins(Form)
    {

    }

    export default FormMain;

</script>
