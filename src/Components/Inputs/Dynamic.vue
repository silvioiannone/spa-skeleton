<template>
    <component :is="component" v-bind="props" v-on="listeners"/>
</template>

<script lang="ts">

import { InputDescription } from '../../Library/Interfaces/InputDescription';
import InputFile from './File.vue';

export default {

    name: 'InputDynamic',

    components: {
        InputFile
    },

    props: {
        /**
         * Input description.
         */
        description: { type: Object, required: true } as InputDescription,

        /**
         * Value.
         */
        value: {}
    },

    computed: {
        component(): string
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
        },

        props()
        {
            return {
                ...this.$props,
                ...this.description
            }
        },

        listeners()
        {
            return {
                ...this.$listeners,
                input: (value: any) => this.$emit('input', value),
                blur: (value: any) => this.$emit('blur', value),
            }
        }
    }
}

</script>
