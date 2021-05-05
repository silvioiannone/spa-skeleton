<template>
    <dialog-main v-bind="$props" v-on="$listeners">
        <slot :on="on" :closable="_closable"/>
    </dialog-main>
</template>

<script lang="ts">

    import { Component, Mixins, Watch, Prop } from 'vue-property-decorator';
    import Dialog from '../Mixins/Dialog.vue';
    import DialogMain from './Main.vue';

    /**
     * This is a dialog that can hold a form in it.
     */
    @Component({
        components: {
            DialogMain
        }
    })
    export class DialogForm extends Mixins(Dialog)
    {
        /**
         * The dialog will be persistent and that will prevent it from closing when clicking on
         * the backdrop.
         */
        @Prop({ type: Boolean, default: true }) persistent: boolean;

        /**
         * Focus the first input of the dialog.
         */
        focus(): void
        {
            setTimeout(() => {
                let firstFormInput =
                    <HTMLElement>document.querySelector(
                        '.v-dialog--active form input, .v-dialog--active form textarea'
                    );

                if (! firstFormInput) {
                    return;
                }

                setTimeout(() => firstFormInput.focus());
            });
        }

        get on(): { [key: string]: Function }
        {
            return {
                cancel: this.handleCancel,
                submit: this.handleSubmit
            }
        }

        /**
         * Propagates the cancel form event to the parent.
         */
        handleCancel(event: Event): void
        {
            this.$emit('cancel', event);
            this.$emit('hidden');
            this.$emit('input', false);
        }

        /**
         * Propagates the submit form event to the parent.
         */
        handleSubmit(event: Event): void
        {
            this.$emit('submit', event);
            this.$emit('hidden');
            this.$emit('input', false);
        }

        @Watch('value', { immediate: true })
        onValueChange(): void
        {
            // Focus the first form element as soon as the dialog is displayed.
            if (this.value) {
                this.focus();
            }
        }
    }

    export default DialogForm;

</script>
