<template>
    <validation-observer slim #default="{ invalid }" ref="validationObserver">
        <v-form @submit.prevent ref="vuetifyForm">
            <v-container fluid pa-0>
                <v-row>
                    <v-col cols="12" v-if="!! serverError">
                        <v-alert type="error" :value="true">
                            <template v-if="serverError && serverError.message">
                                {{ serverError.message }}
                            </template>
                        </v-alert>
                    </v-col>
                    <slot/>
                    <v-col cols="12" :class="{'text-center': centerActions}">
                        <button-submit :on-click="handleSubmit" color="primary" :disabled="invalid"
                                       v-if="submit">
                            {{ submitText || $t('form.submit') }}
                        </button-submit>
                        <slot name="actions"/>
                        <v-btn v-if="cancellable" text @click.stop="cancel">
                            {{ $t('form.cancel') }}
                        </v-btn>
                    </v-col>
                </v-row>
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
