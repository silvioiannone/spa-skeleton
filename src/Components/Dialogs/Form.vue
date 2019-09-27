<template>
    <dialog-main v-model="model" v-bind="getProps()">
        <slot :bubble-submit="bubbleSubmit" :bubble-cancel="bubbleCancel"></slot>
    </dialog-main>
</template>

<script lang="ts">

    import { Component, Mixins, Watch, Prop } from 'vue-property-decorator';
    import { Wrapper }                        from '../Mixins/Wrapper.vue';
    import { DialogMain }                     from './Main.vue';
    import { Dialog }                         from '../Mixins/Dialog.vue';

    /**
     * This is a dialog that can hold a form in it.
     */
    @Component({
        components: {
            DialogMain
        }
    })
    export class DialogForm extends Mixins(Wrapper, Dialog)
    {
        __component = DialogMain;

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

                if (!firstFormInput) {
                    return;
                }

                setTimeout(() => firstFormInput.focus());
            });
        }

        @Watch('model', { immediate: true })
        onValueChange()
        {
            // Focus the first form element as soon as the dialog is displayed.
            if (this.model) {
                this.focus();
            }
        }

        /**
         * Propagates the cancel form event to the parent.
         */
        bubbleCancel(event: Event): void
        {
            this.$emit('cancel', event);
            this.model = false;
        }

        /**
         * Propagates the submit form event to the parent.
         */
        bubbleSubmit(event: Event): void
        {
            this.$emit('submit', event);
            this.model = false;
        }
    }

    export default DialogForm;

</script>
