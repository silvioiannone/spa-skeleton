<template>
    <dialog-main v-model="model" v-bind="getProps()" v-on="getOn()">
        <slot :bubble-submit="bubbleSubmit" :bubble-cancel="bubbleCancel"></slot>
    </dialog-main>
</template>

<script lang="ts">

    import { Component, Mixins, Watch } from 'vue-property-decorator';
    import Wrapper                      from '../Mixins/Wrapper.vue';
    import DialogMain                   from './Main.vue';
    import Dialog                       from '../Mixins/Dialog.vue';

    /**
     * This is a dialog that can hold a form in it.
     */
    @Component({
        components: {
            DialogMain
        }
    })
    export default class DialogForm extends Mixins(Wrapper, Dialog)
    {
        __component = DialogMain;

        /**
         * Focus the first input of the dialog.
         */
        focus()
        {
            this.$nextTick(() =>
            {
                let firstFormInput =
                    <HTMLElement>document.querySelector('.v-dialog--active form input, .v-dialog--active form textarea');

                if (!firstFormInput) {
                    return;
                }

                this.$nextTick(() =>
                {
                    firstFormInput.focus();
                });
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

</script>