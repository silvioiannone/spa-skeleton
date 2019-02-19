<script lang="ts">

    import { VNode }                          from 'vue';
    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import Input                              from './Input.vue';

    declare module 'vue/types/vue' {

        interface Vue {
            isDirty: any
        }
    }

    /**
     * This mixin can be used in order to create text fields.
     *
     * It is possible to override any of the value of the props by defining a computed value with
     * the same name.
     */
    @Component
    export default class TextField extends Mixins(Input)
    {
        /**
         * Make the input required.
         */
        @Prop({ type: Boolean, default: false }) required: boolean;

        /**
         * Value of the name attribute.
         */
        @Prop({ type: String, default: '' }) name: string;

        /**
         * Validation rules.
         */
        @Prop({ type: [String, Object], default: '' }) validation: string | object;

        /**
         * Input type.
         */
        @Prop({ type: String, default: '' }) type: string;

        /**
         * Field step size.
         */
        @Prop({ type: String, default: '1'}) step: string;

        /**
         * Maximum value.
         */
        @Prop(String) max: string;

        /**
         * Minimum value.
         */
        @Prop(String) min: string;

        /**
         * Input mask.
         */
        @Prop({ type: String, default: '' }) mask: string;

        /**
         * Input field prefix.
         */
        @Prop({ type: String, default: '' }) prefix: string;

        /**
         * Suffix.
         */
        @Prop({ type: String, default: '' }) suffix: string;

        /**
         * Placeholder.
         */
        @Prop({ type: String, default: '' }) placeholder: string;

        /**
         * Display the text field with a "solo" style.
         */
        @Prop({ type: Boolean, default: false }) solo: boolean;

        /**
         * Prepend an icon to the text field.
         */
        @Prop({ type: String, default: '' }) prependIcon: string;

        /**
         * Prepend an icon to the text field.
         */
        @Prop({ type: String, default: '' }) appendIcon: string;

        /**
         * Make the text field clearable.
         */
        @Prop({ type: Boolean, default: false }) clearable: boolean;

        /**
         * Set the validation alias.
         */
        @Prop(String) vvAs: string;

        /**
         * Creates counter for input length; if no number is specified, it defaults to 25. Does
         * not apply any validation.
         */
        @Prop(Number) counter: number;

        /**
         * Returns the unmodified masked string.
         */
        @Prop({ type: Boolean, default: false }) returnMaskedValue: boolean;

        /**
         * Applies the alternate box input style.
         */
         @Prop({ type: Boolean, default: false }) box: boolean;

        /**
         * Applies the alternate outline input style.
         */
         @Prop({ type: Boolean, default: false }) outline: boolean;

        protected isFocused: boolean = false;

        /**
         * Override this in order to specify a class that should be applied to the input
         * element.
         */
        get _class(): string
        {
            return '';
        }

        /**
         * This can be overridden in order to modify the value passed to the `v-text-field`.
         */
        get _value(): any
        {
            return this.$props.value;
        }

        /**
         * Override this in order to define the validation rules.
         */
        get _validation(): any
        {
            return this.validation;
        }

        /**
         * Bubble the input event.
         *
         * This method is declared here instead of the event definition because this way it can
         * be easily overridden.
         *
         * @param value
         */
        fireInputEvent(value: any): void
        {
            this.$emit('input', value);
        }

        /**
         * Access the form containing the text field.
         */
        parentForm(): any
        {
            return this.$parent.$parent.$parent;
        }

        mounted(): void
        {
            // This is a work-around needed in order to prevent Vuetify text-input mask to trigger
            // the validation too soon.
            let input = this.$el.querySelector('input');

            if (! input) {
                return;
            }

            input.addEventListener('focus', (): void =>
            {
                this.isFocused = true;
            });
            input.addEventListener('blur', (): void =>
            {
                this.isFocused = false;
            });
        }

        @Watch('value')
        onValueChanged()
        {
            // Trigger the validation on the next tick but only if the input is dirty
            if (this.$children[0].isDirty) {
                this.$nextTick((): void => { this.$validator.validateAll() });
            }
        }

        render(createElement: Function): VNode
        {
            let self = this;

            let props = {
                ...self.$props,
                errorMessages: self._errorMessages,
                value: self._value
            };

            return createElement('v-text-field', {
                attrs: {
                    name: self.name,
                    type: self.type,
                    step: self.step,
                    min: self.min,
                    max: self.max,
                    class: self._class,
                    'data-vv-as': self.vvAs
                },
                directives: [
                    {
                        name: 'validate',
                        value: self._validation
                    }
                ],
                props,
                on: {
                    input: (value: any): void => self.fireInputEvent(value),
                    blur: () => self.$emit('blur', null),
                    focus: () => self.$emit('focus', null),
                    'update:error': (value: any): void => { self.$emit('update:error', value) },
                    'click:clear': (): void => { self.$emit('click:clear', null) }
                }
            });
        }
    }

</script>
