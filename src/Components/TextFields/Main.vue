<template>
    <validation-provider #default="{ errors }" :rules="rules" :name="_validationName" :vid="name"
                         ref="validationProvider" slim>
        <v-text-field v-bind="textFieldProps" v-on="$listeners" :error-messages="errors"
                      :outlined="_outlined || outlined" :value="value" @blur="handleBlur">
        </v-text-field>
    </validation-provider>
</template>

<script lang="ts">

    import { Config } from '../../Config';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { TextField } from '../Mixins/TextField.vue';
    import { Validatable } from '../Mixins/Components/Validatable.vue';

    @Component
    export class TextFieldMain extends Mixins(TextField, Validatable)
    {
        /**
         * Validation rules.
         */
        @Prop({ type: String, default: '' }) rules: any;

        get _outlined(): boolean
        {
            return Config.ui.components.textField.defaultStyle === 'outlined';
        }

        get textFieldProps(): any
        {
            let props = { ...this.$props };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }
    }

    export default TextFieldMain;

</script>
