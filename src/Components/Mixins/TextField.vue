<script lang="ts">

    import Vue, { VNode } from 'vue';
    import MixinInput     from './Input.vue';

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
    export default Vue.extend({

        mixins: [
            MixinInput
        ],

        props: {

            /**
             * Make the phone input required.
             */
            required: {
                type: Boolean,
                default: false
            },

            /**
             * Value of the name attribute.
             */
            name: {
                type: String,
                default: ''
            },

            /**
             * Validation rules.
             */
            validation: {
                type: [String, Object],
                default: ''
            },

            /**
             * Input type.
             */
            type: {
                type: String,
                default: ''
            },

            /**
             * Field step size.
             */
            step: {
                type: String,
                default: '1'
            },

            /**
             * Maximum value.
             */
            max: {
                type: String
            },

            /**
             * Minimum value.
             */
            min: {
                type: String
            },

            /**
             * Input mask.
             */
            mask: {
                type: String,
                default: ''
            },

            /**
             * Input field prefix.
             */
            prefix: {
                type: String,
                default: ''
            },

            /**
             * Suffix.
             */
            suffix: {
                default: ''
            },

            /**
             * Placeholder.
             */
            placeholder: {
                type: String,
                default: ''
            },

            /**
             * Display the text field with a "solo" style.
             */
            solo: {
                type: Boolean,
                default: false
            },

            /**
             * Prepend an icon to the text field.
             */
            prependIcon: {
                type: String,
                default: ''
            },

            /**
             * Prepend an icon to the text field.
             */
            appendIcon: {
                type: String,
                default: ''
            },

            /**
             * Make the text field clearable.
             */
            clearable: {
                type: Boolean,
                default: false
            },

            /**
             * Set the validation alias.
             */
            vvAs: {
                type: String
            },

            /**
             * Creates counter for input length; if no number is specified, it defaults to 25. Does
             * not apply any validation.
             */
            counter: {
                type: Number,
                default: undefined
            },

            /**
             * Returns the unmodified masked string.
             */
            returnMaskedValue: {
                type: Boolean,
                default: false
            }
        },

        data()
        {
            return {
                isFocused: false
            }
        },

        computed: {

            /**
             * Override this in order to specify a class that should be applied to the input
             * element.
             */
            _class(): string
            {
                return '';
            },

            /**
             * This can be overridden in order to modify the value passed to the `v-text-field`.
             */
            _value(): any
            {
                return this.$props.value;
            },

            /**
             * Override this in order to define the validation rules.
             */
            _validation(): any
            {
                return this.validation;
            }
        },

        methods: {

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
            },

            /**
             * Access the form containing the text field.
             */
            parentForm(): any
            {
                return this.$parent.$parent.$parent;
            }
        },

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
        },

        watch: {

            value(): void
            {
                // Trigger the validation on the next tick but only if the input is dirty
                if (this.$children[0].isDirty) {
                    this.$nextTick((): void => this.$validator.validateAll());
                }
            }
        },

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
                    'update:error': (value: any): void => self.$emit('update:error', value),
                    'click:clear': (): void => self.$emit('click:clear', null)
                }
            });
        }
    });

</script>
