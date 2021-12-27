<template>
    <dialog-main v-bind="$props" v-on="$listeners">
        <slot :on="on" :closable="internalClosable"/>
    </dialog-main>
</template>

<script lang="ts">

import Dialog from '../Mixins/Dialog.vue';
import DialogMain from './Main.vue';

export default {

    name: 'DialogForm',

    mixins: [Dialog],

    components: {
        DialogMain
    },

    props: {
        /**
         * The dialog will be persistent and that will prevent it from closing when clicking on
         * the backdrop.
         */
        persistent: { type: Boolean, default: true }
    },

    computed: {
        on(): { [key: string]: Function }
        {
            return {
                cancel: this.handleCancel,
                submit: this.handleSubmit
            }
        }
    },

    methods: {
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
        },

        /**
         * Propagates the cancel form event to the parent.
         */
        handleCancel(event: Event): void
        {
            this.$emit('cancel', event);
            this.$emit('hidden');
            this.$emit('input', false);
        },

        /**
         * Propagates the submit form event to the parent.
         */
        handleSubmit(event: Event): void
        {
            this.$emit('submit', event);
            this.$emit('hidden');
            this.$emit('input', false);
        }
    },

    mounted(): void
    {
        this.$watch('value', () => {
            // Focus the first form element as soon as the dialog is displayed.
            if (this.value) {
                this.focus();
            }
        }, { immediate: true });
    }
}

</script>
