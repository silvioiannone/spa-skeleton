<template>
    <validation-provider #default="{ errors }" :rules="rules" :name="name" ref="validationProvider"
                         slim>
        <v-textarea v-bind="textareaProps" v-on="$listeners" :error-messages="errors" :value="value"
                    :outlined="internalOutlined || outlined" :label="internalLabel"
                    @blur="handleBlur"/>
    </validation-provider>
</template>

<script lang="ts">

import { Config } from '../../Config';
import Textarea from '../Mixins/Textarea.vue';
import Validatable from '../Mixins/Components/Validatable.vue';

export default {

    name: 'TextareaMain',

    mixins: [Textarea, Validatable],

    computed: {
        internalOutlined(): boolean
        {
            return Config.ui.components.textarea.defaultStyle === 'outlined';
        },

        textareaProps(): any
        {
            let props = { ...this.$props };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }
    }
}

</script>
