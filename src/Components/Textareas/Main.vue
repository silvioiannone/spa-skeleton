<template>
    <validation-provider #default="{ errors }" :rules="rules" :name="name" ref="validationProvider"
                         slim>
        <v-textarea v-bind="textareaProps" v-on="$listeners" :error-messages="errors" :value="value"
                    :outlined="_outlined || outlined" @blur="handleBlur">
        </v-textarea>
    </validation-provider>
</template>

<script lang="ts">

    import { Config } from '../../Config';
    import { Component, Mixins } from 'vue-property-decorator';
    import { Textarea } from '../Mixins/Textarea.vue';
    import { Validatable } from '../Mixins/Components/Validatable.vue';

    @Component
    export class TextareaMain extends Mixins(Textarea, Validatable)
    {
        get _outlined(): boolean
        {
            return Config.ui.components.textarea.defaultStyle === 'outlined';
        }

        get textareaProps(): any
        {
            let props = { ...this.$props };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }
    }

    export default TextareaMain;

</script>
