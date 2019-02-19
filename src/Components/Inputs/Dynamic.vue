<template>
    <component :is="component" :label="_label" :solo="solo" :box="box" :outline="outline"
               :name="_name" @input="bubbleInput" :value="value">
    </component>
</template>

<script lang="ts">

    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import { InputDescription }        from '../../Library/Interfaces/InputDescription';
    import { TextField }               from 'spa-skeleton';

    @Component
    export default class InputDynamic extends Mixins(TextField)
    {
        /**
         * Input description.
         */
        @Prop({ type: Object, required: true }) description: InputDescription;

        get component()
        {
            switch (this.description.type) {
                case 'input':
                    return 'v-text-field';
                case 'textarea':
                    return 'v-textarea';
            }
        }

        get _name()
        {
            return this.description.name;
        }

        get _label()
        {
            if (this.description.label) {
                return this.description.label;
            }

            let name = this.description.name;

            return name.charAt(0).toUpperCase() + name.slice(1, name.length);
        }

        /**
         * Bubble up the `input` event.
         */
        bubbleInput(value: any): void
        {
            this.$emit('input', value);
        }
    }

</script>
