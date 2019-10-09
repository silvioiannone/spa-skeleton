<script lang="ts">

    import { VNode } from 'vue';
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
                            errorMessages: props.errors,
                            outlined: this._outlined || this.outlined,
                            value: this.value
                        },
                        directives: vTextFieldDirectives,
                        on: {
                            ...this.$listeners,
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