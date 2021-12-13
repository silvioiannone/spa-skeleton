<template>
    <validation-observer slim #default="{ invalid }" ref="validationObserver">
        <v-form @submit.prevent ref="vuetifyForm">
            <v-container fluid pa-0>
                <v-row>
                    <v-col cols="12" v-if="$slots.error">
                        <slot name="error"/>
                    </v-col>
                    <v-col cols="12" v-if="!! serverError">
                        <v-alert type="error" :value="true">
                            <template v-if="serverError && serverError.message">
                                {{ serverError.message }}
                            </template>
                        </v-alert>
                    </v-col>
                    <slot/>
                    <v-col cols="12" :class="{'text-center': centerActions }">
                        <button-submit v-if="submit" :on-click="handleSubmit" color="primary"
                                       :disabled="invalid || disabled">
                            {{ submitText || $t('form.submit') }}
                        </button-submit>
                        <slot name="actions" :disabled="invalid || disabled"/>
                        <v-btn v-if="cancellable" text @click.stop="cancel">
                            {{ $t('actions.cancel') }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
    </validation-observer>
</template>

<script lang="ts">

import Form from '../Mixins/Form.vue';

export default {

    name: 'FormMain',

    mixins: [Form]
}

</script>
