<script lang="ts">

import { VNode } from 'vue';
import TextField from '../Mixins/TextField.vue';
import Validatable from '../Mixins/Components/Validatable.vue';

export default {

    name: 'TextFieldMain',

    mixins: [TextField, Validatable],

    computed: {
        listeners(): any
        {
            return {
                ...this.$listeners,
                input: this.handleInput
            };
        },

        textFieldProps(): any
        {
            let props = {
                ...this.$props,
                label: this.internalLabel,
                outlined: this.internalOutlined || this.outlined,
                value: this.value,
            };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }
    },

    methods: {
        /**
         * Handle the `input` event fired by the `v-text-field` component.
         */
        handleInput(eventValue: string): void
        {
            let value: string | number = eventValue;

            if (this.type === 'number') {
                let parsedValue = parseFloat(eventValue);

                value = isNaN(parsedValue) ? '' : parsedValue;
            }

            this.$emit('input', value);
        }
    },

    /**
     * Render the component.
     */
    render(createElement: Function): VNode
    {
        let vTextFieldDirectives: { name: string, value: string }[] = [];

        if (this.mask.length) {
            vTextFieldDirectives.push({
                name: 'mask',
                value: this.mask
            })
        }

        return createElement('validation-provider', {
            props: {
                rules: this.rules,
                name: this.name,
                vid: this.name,
            },
            scopedSlots: {
                default: (props: { errors: any }): VNode => createElement('v-text-field', {
                    props: {
                        ...this.textFieldProps,
                        errorMessages: props.errors
                    },
                    attrs: this.$attrs,
                    directives: vTextFieldDirectives,
                    on: this.listeners
                })
            },
            ref: 'validationProvider'
        }, [])
    }
}

</script>
