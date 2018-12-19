<script lang="ts">

    import Vue               from 'vue';
    import ResponseInterface from '../../Library/Api/ResponseInterface';

    declare module 'vue/types/vue' {

        interface Vue {
            model: any,
            value: any
        }
    }

    /*
     * This mixin can be used in order to create new forms.
     */
    export default Vue.extend({

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
                required: false,
                default: false
            },

            /**
             * Text for the submit button.
             */
            submitText: {
                type: String
            }
        },

        data(): any
        {
            return {
                _vFormValid: true,
                _resetOnMount: true
            }
        },

        computed: {

            hasErrors(): boolean
            {
                return ! this.$data._vFormValid;
            }
        },

        methods: {

            /**
             * Cancel the form.
             */
            cancel(): void
            {
                this.$emit('cancel', null);
            },

            /**
             * Handle the form submission.
             */
            handleSubmit(): Promise<ResponseInterface>
            {
                return new Promise((resolve: Function, reject: Function) =>
                {
                    // Before submitting make sure that the form is valid.
                    this.$validator.validateAll()
                        .then((result: any) =>
                        {
                            if (!result) {
                                reject();
                                return;
                            }

                            this.submit()
                                .then((response: ResponseInterface) =>
                                {
                                    this.resetForm();
                                    this.$emit('submit', response);
                                    resolve(response);
                                })
                                .catch((response: ResponseInterface) =>
                                {
                                    this.$emit('error', response);
                                    console.error(response);
                                    this.handleErrors(response);
                                    reject(response);
                                });
                        });
                });
            },

            /**
             * Handle errors.
             */
            handleErrors(response: ResponseInterface): void
            {
                if (! response.body.errors) {
                    return;
                }

                // Assign the errors to the validator.
                for (let index in response.body.errors) {
                    // If the error's index is a number then it is a server error not linked to a
                    // form input.
                    let parsedIndex = parseInt(index);
                    if (!Number.isNaN(parsedIndex) && typeof parsedIndex === 'number') {
                        this.errors.add({
                            field: '_server',
                            msg: response.body.errors[index]['details'] ||
                                response.body.errors[index]['title'],
                            scope: '_server'
                        });
                    } else {
                        // These errors need to be set on the parent form because that's where the
                        // other components are located.
                        this.$parent.errors.add({
                            field: index,
                            msg: response.body.errors[index][0]
                        });
                        this.errors.add({
                            field: '_server',
                            msg: response.body.message,
                            scope: '_server'
                        });
                    }
                }
            },

            /**
             * Reset the form to its original state.
             */
            resetForm(): void
            {
                this.errors.clear();
                this.errors.clear('_server');

                if (this.$parent) {
                    this.$parent.errors.clear();
                    this.$parent.model = {...this.$parent.model, ...this.$parent.value};
                }
            }
        },

        created(): void
        {
            this.resetForm();
        },

        mounted(): void
        {
            // Whenever an input is focused we need to remove the server errors associated with it.
            this.$nextTick(function(this: any): void
            {
                this.$el.querySelectorAll('input, textarea')
                    .forEach((element: any): void =>
                    {
                        element.addEventListener('focusin', (event: any) =>
                        {
                            let field = event.target.getAttribute('name');
                            this.errors.remove(field, 'server');
                            this.$parent.errors.remove(field);
                        });
                    });
            });
        },

        watch: {

            focus: {
                handler: function(): void
                {
                    if (! this.$el) {
                        return;
                    }

                    let firstInput = this.$el.querySelector('input');

                    if (firstInput) {
                        this.$nextTick(() =>
                        {
                            firstInput && firstInput.focus();
                        });
                    }
                },
                immediate: true
            }
        }
    });

</script>
