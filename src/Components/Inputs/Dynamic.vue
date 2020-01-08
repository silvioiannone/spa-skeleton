<template>
    <component :is="component" v-bind="props" v-on="listeners"/>
</template>

<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';
    import { InputDescription } from '../../Library/Interfaces/InputDescription';

    @Component
    export class InputDynamic extends Vue
    {
        /**
         * Input description.
         */
        @Prop({ type: Object, required: true }) description: InputDescription;

        get component()
        {
            switch (this.description.kind) {
                case 'input':
                    return 'text-field-main';
                case 'textarea':
                    return 'textarea-main';
            }
        }

        get props()
        {
            return {
                ...this.description
            }
        }

        get listeners()
        {
            return {
                ...this.$listeners,
                input: (value: any) => this.$emit('input', value),
                blur: (value: any) => this.$emit('input', value),
            }
        }
    }

    export default InputDynamic;

</script>
