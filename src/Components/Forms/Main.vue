<template>
    <validation-observer slim #default="{ invalid }" ref="validationObserver">
        <v-form @submit.prevent ref="vuetifyForm">
            <v-container fluid grid-list-lg class="pa-0">
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-alert type="error" :value="!! serverError">
                            <template v-if="serverError && serverError.message">
                                {{ serverError.message }}
                            </template>
                        </v-alert>
                    </v-flex>
                    <slot></slot>
                    <v-flex xs12 :class="{'text-center': centerActions}">
                        <button-submit :on-click="handleSubmit" color="primary" :disabled="invalid"
                                       v-if="submit">
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
    </validation-observer>
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
