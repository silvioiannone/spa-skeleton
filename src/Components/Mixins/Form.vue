<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { ResponseInterface }    from '../../Library/Api/ResponseInterface';

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
        @Prop({ type: Function }) submit: Function;

        /**
         * Text for the submit button.
         */
        @Prop({ type: String, default: 'Submit' }) submitText: String;

        /**
         * Allow batch submission of the form.
         *
         * Once the form is submitted it will be made ready for a new submission.
         */
        @Prop({ type: Boolean, default: false }) batch: boolean;

        /**
         * Form model value.
         */
        @Prop() value: any;

        initialModel: any = {};

        serverError: { message: string } | null = null;

        fieldServerErrors: any[] = [];

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
        async handleSubmit(): Promise<ResponseInterface>
        {
            let response = null;

            try {
                response = await this.submit();
            } catch (response) {
                this.$emit('error', response);
                this.handleErrors(response);
                throw response;
            }

            this.resetForm();
            this.$emit('submit', response);
            return response;
        }

        /**
         * Handle errors.
         */
        handleErrors(response: ResponseInterface): void
        {
            let serverErrorStatuses = [405, 500];

            if (serverErrorStatuses.includes(response.status)) {
                this.$eh.$emit('SnackbarDisplayMessage', {
                    color: 'error',
                    message: 'Server error.'
                });
                return;
            }

            this.serverError = {
                message: response.body.title
            };

            if (! response.body.errors) {
                return;
            }

            // Assign the errors to the validator.
            let validationObserverErrors = {};

            for (let index in response.body.errors) {
                validationObserverErrors[index] = response.body.errors[index];
            }

            (this.$refs.validationObserver as any).setErrors(validationObserverErrors);
        }

        /**
         * Focus the form.
         */
        focus(): void
        {
            let firstFormInput = <HTMLElement>this.$el
                .querySelector('form input, form textarea');

            if (! firstFormInput) {
                return;
            }

            firstFormInput.focus();
        }

        /**
         * Reset the form to its original state.
         */
        resetForm(): void
        {
            this.serverError = null;

            if (this.batch) {
                (this.$refs.vuetifyForm as any).reset();
                requestAnimationFrame(() => {
                    (this.$refs.validationObserver as any).reset();
                    this.focus();
                });
            }
        }

        mounted(): void
        {
            if (this.value) {
                let parent = (this.$parent as any)
                parent.model = { ...parent.model, ...this.value };
            }
        }
    }

    export default Form;

</script>
