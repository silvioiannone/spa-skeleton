<template>
    <v-form @submit.prevent>
        <v-container fluid grid-list-lg class="pa-0">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-alert type="error" :value="$parent.errors.any('_server')">
                        <template v-if="$parent.errors.all('_server')[0]">
                            {{ $parent.errors.all('_server')[0] }}
                        </template>
                    </v-alert>
                </v-flex>
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

    export default {

        name: 'FormMain',

        props: {

            /**
             * Whether or not the cancel button should be displayed.
             */
            cancellable: {
                type: Boolean,
                default: false
            },

            /**
             * Whether the buttons should be centered or not.
             */
            centerActions: {
                type: Boolean,
                default: false
            },

            /**
             * Submit action.
             *
             * It needs to be a function returning a promise.
             */
            submit: {
                type: Function,
                required: true
            },

            /**
             * Text for the submit button.
             */
            submitText: {
                type: String,
                default: 'Submit'
            }
        },

        computed: {

            _cancellable()
            {
                return this.$parent.cancellable || this.cancellable;
            },

            hasErrors()
            {
                return this.$parent.errors.any(null);
            },

            canSubmit()
            {
                return (typeof this.$parent.canSubmit !== 'undefined') ?
                    this.$parent.canSubmit : true;
            }
        },

        methods: {

            /**
             * Cancel the form.
             */
            cancel()
            {
                this.$parent.$validator.reset();
                this.$emit('cancel')
            },

            /**
             * Handle the form submission.
             *
             * @param resolve
             * @param reject
             */
            handleSubmit()
            {
                return new Promise((resolve, reject) =>
                {
                    // Before submitting make sure that the form is valid.
                    this.$parent.$validator
                        .validateAll()
                        .then(result =>
                        {
                            if (!result) {
                                reject();
                                return;
                            }

                            this.submit()
                                .then(response =>
                                {
                                    this.$parent.$validator.pause();
                                    this.$emit('submitted', response);
                                    resolve(response);
                                })
                                .catch(error => {
                                    console.error(error);
                                    this.$emit('error', error);
                                    reject(error);
                                });
                        });
                });
            }
        }
    }

</script>
