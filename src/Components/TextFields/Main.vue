<script lang="ts">

    import { VNode } from 'vue';
    import { Component, Mixins } from 'vue-property-decorator';
    import { TextField } from '../Mixins/TextField.vue';
    import { Validatable } from '../Mixins/Components/Validatable.vue';

    @Component
    export class TextFieldMain extends Mixins(TextField, Validatable)
    {
        /**
         * Handle the `input` event fired by the `v-text-field` component.
         */
        handleInput(eventValue: string): void
        {
            let value = this.type === 'number' ? parseFloat(eventValue) : eventValue;

            this.$emit('input', value);
        }

        get listeners(): any
        {
            return {
                ...this.$listeners,
                input: this.handleInput
            };
        }

        get textFieldProps(): any
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
                    name: this._validationName,
                    vid: this.name,
                },
                scopedSlots: {
                    default: (props: { errors: any }): VNode => createElement('v-text-field', {
                        props: {
                            ...this.textFieldProps,
                            errorMessages: props.errors
                        },
                        attrs: {
                            min: this.min,
                            max: this.max
                        },
                        directives: vTextFieldDirectives,
                        on: {
                            ...this.listeners,
                            blur: this.handleBlur
                        }
                    })
                },
                ref: 'validationProvider'
            }, [])
        }
    }

    export default TextFieldMain;

</script>
