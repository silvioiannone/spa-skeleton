<script lang="ts">

    import { VNode } from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { TextField } from '../Mixins/TextField.vue';

    @Component
    export class InputFile extends Mixins(TextField)
    {
        /**
         * Accepted file types.
         */
        @Prop({ type: String, default: '' }) accept: string;

        get fileInputProps(): any
        {
            let props = {
                ...this.$props,
                outlined: this._outlined || this.outlined,
                value: this.value
            };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }

        /**
         * Render the component.
         */
        render(createElement: Function): VNode
        {
            return createElement('v-file-input', {
                attrs: {
                    name: this.name,
                    accept: this.accept
                },
                props: this.fileInputProps,
            });
        }
    }

    export default InputFile;

</script>
