<template>
    <component :is="component" v-bind="props" v-on="listeners"/>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import { InputDescription } from '../../Library/Interfaces/InputDescription';
    import InputFile from './File.vue';

    @Component({
        components: {
            InputFile
        }
    })
    export class InputDynamic extends Vue
    {
        /**
         * Input description.
         */
        @Prop({ type: Object, required: true }) description: InputDescription;

        /**
         * Value.
         */
        @Prop({}) value: any;

        get component(): string
        {
            switch (this.description.kind) {
                case 'checkbox':
                    return 'v-checkbox';
                case 'file':
                    return 'v-file-input';
                case 'input':
                    return 'text-field-main';
                case 'textarea':
                    return 'textarea-main';
            }
        }

        get props()
        {
            return {
                ...this.$props,
                ...this.description
            }
        }

        get listeners()
        {
            return {
                ...this.$listeners,
                input: (value: any) => this.$emit('input', value),
                blur: (value: any) => this.$emit('blur', value),
            }
        }
    }

    export default InputDynamic;

</script>
