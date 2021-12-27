<script lang="ts">

import { ResponseInterface } from '../../Library/Api/ResponseInterface';

export default {

    props: {
        /**
         * Whether or not the cancel button should be displayed.
         */
        cancellable: { type: Boolean, default: false },

        /**
         * Whether the buttons should be centered or not.
         */
        centerActions: { type: Boolean, default: false },

        /**
         * Submit action.
         *
         * It needs to be a function returning a promise.
         */
        submit: { type: Function },

        /**
         * Text for the submit button.
         */
        submitText: { type: String, default: 'Submit' },

        /**
         * Allow batch submission of the form.
         *
         * Once the form is submitted it will be made ready for a new submission.
         */
        batch: { type: Boolean, default: false },

        /**
         * Disable the submit button.
         */
        disabled: { type: Boolean, default: false },

        /**
         * Form model value.
         */
        value: {}
    },

    data()
    {
        return {
            initialModel: {},
            serverError: null as { message: string } | null,
            fieldServerErrors: [],
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
        },

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
        },

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
        },

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
    },

    mounted(): void
    {
        if (this.value) {
            let parent = (this.$parent as any)
            parent.model = { ...parent.model, ...this.value };
        }
    }
}

</script>
