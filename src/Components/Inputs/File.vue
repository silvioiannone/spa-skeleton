<script lang="ts">

    import { VNode } from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import TextField from '../Mixins/TextField.vue';

    @Component
    export class InputFile extends Mixins(TextField)
    {
        /**
         * Accepted file types.
         */
        @Prop({ type: String, default: '' }) accept: string;

        /**
         * Changes display of selections to chips
         */
        @Prop({ type: Boolean, default: false }) chips: boolean;

        /**
         * Adds the multiple attribute to the input, allowing multiple file selections.
         */
        @Prop({ type: Boolean, default: false }) multiple: boolean;

        /**
         * Prepends an icon inside the component’s input, uses the same syntax as `v-icon`.
         */
        @Prop({ type: String, default: '' }) prependInnerIcon: string;

        get fileInputProps(): any
        {
            let props = {
                ...this.$props,
                label: this._label,
                outlined: this._outlined || this.outlined,
                value: this.value,
                type: 'file'
            };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }

        /**
         * Handle the change event fired by the `v-file-input` component.
         */
        handleChange(file: File): void
        {
            this.$emit('input', file);
        }

        /**
         * Render the component.
         */
        render(createElement: Function): VNode
        {
            return createElement('v-file-input', {
                attrs: {
                    name: this.name,
                    accept: this.accept,
                    multiple: this.multiple
                },
                on: {
                    ...this.$listeners,
                    change: this.handleChange
                },
                props: this.fileInputProps,
            });
        }
    }

    export default InputFile;

</script>
