<script lang="ts">

    import Vue                        from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';

    /*
     * This mixin adds some functionality to dialogs that are only supposed to display a form.
     */
    @Component
    export default class Form extends Vue
    {
        /**
         * Dialog's visibility.
         */
        @Prop({ type: Boolean, default: true }) value: boolean;

        get model()
        {
            return this.value;
        }

        set model(value: boolean)
        {
            if (! value) {
                this.$emit('hidden');
            }

            this.$emit('input', value);
        }

        /**
         * Focus the first input of the dialog.
         */
        focus()
        {
            this.$nextTick(() =>
            {
                let firstFormInput =
                    <HTMLElement>document.querySelector('.v-dialog--active form input');

                if (firstFormInput) {
                    firstFormInput.focus();
                }
            });
        }

        @Watch('value', { immediate: true })
        onValueChange()
        {
            if (this.value) {
                this.focus();
            }
        }
    }

</script>
