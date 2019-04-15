<script lang="ts">

    declare module 'vue/types/vue' {

        interface Vue {
            model: any,
            value: any
        }
    }

    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import { ResponseInterface }           from '../../Library/Api/ResponseInterface';

    /**
     * This mixin can be used in order to create new forms.
     */
    @Component
    export class Form extends Vue
    {
        /**
         * Whether or not the cancel button should be displayed.
         */
        @Prop({ type: Boolean, default: false }) cancellable: boolean;

        /**
         * Whether the buttons should be centered or not.
         */
        @Prop({ type: Boolean, default: false }) centerActions: boolean;

        /**
         * Submit action.
         *
         * It needs to be a function returning a promise.
         */
        @Prop({ type: Function, required: true }) submit: Function;

        /**
         * Text for the submit button.
         */
        @Prop({ type: String, default: 'Submit' }) submitText: String;

        _vFormValid: boolean = true;

        _resetOnMount: boolean = true;

        get hasErrors(): boolean
        {
            return ! this.$data._vFormValid;
        }

        /**
         * Cancel the form.
         */
        cancel(): void
        {
            this.$emit('cancel', null);
        }

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
        }

        /**
         * Handle errors.
         */
        handleErrors(response: ResponseInterface): void
        {
            if (response.status === 500) {
                this.$eh.$emit('SnackbarDisplayMessage', {
                    color: 'error',
                    message: 'Server error.'
                });
                return;
            }

            this.errors.add({
                field: '_server',
                msg: response.body.title,
                scope: '_server'
            });

            if (! response.body.errors) {
                return;
            }

            // Assign the errors to the validator.
            for (let index in response.body.errors) {
                // These errors need to be set on the parent form because that's where the
                // other components are located.
                this.$parent.errors.add({
                    field: index,
                    msg: response.body.errors[index][0]
                });
            }
        }

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

        created(): void
        {
            this.resetForm();
        }

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
        }

        @Watch('focus', { immediate: true })
        onFocusChanged(): void
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
        }
    }

    export default Form;

</script>
