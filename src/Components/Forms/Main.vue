<template>
    <v-form @submit.prevent>
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
                <v-flex xs12 :class="{'text-xs-center': centerActions}" v-if="submit">
                    <button-submit :on-click="handleSubmit" color="primary"
                                   :disabled="hasErrors">
                        {{ submitText }}
                    </button-submit>
                    <slot name="actions"></slot>
                    <v-btn v-if="cancellable" flat @click="cancel">Cancel</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </v-form>
</template>

<script>

    import MixinForm from '../Mixins/Form';

    export default {

        name: 'FormMain',

        mixins: [
            MixinForm
        ]
    }

</script>
