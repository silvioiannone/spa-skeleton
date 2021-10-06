<script lang="ts">

    import { VNode } from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import TextField from '../Mixins/TextField.vue';

    @Component
    export class InputFile extends Mixins(TextField)
    {
        get props(): any
        {
            return {
                ...this.$props,
                label: this._label,
                outlined: this._outlined
            };
        }

        /**
         * Render the component.
         */
        render(createElement: Function): VNode
        {
            return createElement('v-file-input', {
                on: this.$listeners,
                props: this.props,
                attrs: this.$attrs
            });
        }
    }

    export default InputFile;

</script>
