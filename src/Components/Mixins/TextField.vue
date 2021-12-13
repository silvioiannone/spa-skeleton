<script lang="ts">

import { VNode } from 'vue';
import { Config } from '../../Config';
import Input from './Input.vue';
import MixinComponent from '../Mixins/Component.vue';

/**
 * This mixin can be used in order to create text fields.
 *
 * It is possible to override any of the value of the props by defining a computed value with
 * the same name.
 */
export default {

    mixins: [Input, MixinComponent],

    props: {
        /**
         * Input type.
         */
        type: { type: String },

        /**
         * Field step size.
         */
        step: { type: String, default: '1' },

        /**
         * Input mask.
         */
        mask: { type: String, default: '' },

        /**
         * Input field prefix.
         */
        prefix: { type: String, default: '' },

        /**
         * Suffix.
         */
        suffix: { type: String, default: '' },

        /**
         * Placeholder.
         */
        placeholder: { type: String, default: '' },

        /**
         * Display the text field with a "solo" style.
         */
        solo: { type: Boolean, default: false },

        /**
         * Prepend an icon to the text field.
         */
        prependIcon: { type: String, default: '' },

        /**
         * Prepend an icon to the text field.
         */
        appendIcon: { type: String, default: '' },

        /**
         * Appends an icon to the outside the component's input, uses same syntax as `v-icon`.
         */
        appendOuterIcon: { type: String, default: '' },

        /**
         * Make the text field clearable.
         */
        clearable: { type: Boolean, default: false },

        /**
         * Creates counter for input length; if no number is specified, it defaults to 25. Does
         * not apply any validation.
         */
        counter: Number,

        /**
         * Returns the unmodified masked string.
         */
        returnMaskedValue: { type: Boolean, default: false },

        /**
         * Applies the alternate filled input style.
         */
        filled: { type: Boolean, default: false },

        /**
         * Applies the alternate outline input style.
         */
        outlined: { type: Boolean, default: undefined },

        /**
         * Hides hint, validation errors
         */
        hideDetails: { type: Boolean, default: false },

        /**
         * Removes elevation (shadow) added to element when using the solo or solo-inverted props
         */
        flat: { type: Boolean, default: false },

        /**
         * Reduces element opacity until focused.
         */
        soloInverted: { type: Boolean, default: false },

        /**
         * Reduces the input height.
         */
        dense: { type: Boolean, default: false },

        /**
         * Make the component read-only.
         */
        readonly: { type: Boolean, default: false }
    },

    computed: {
        _outlined(): boolean
        {
            if (this.outlined === undefined) {
                return Config.ui.components.textField.defaultStyle === 'outlined';
            }

            return this.outlined;
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
    },

    render(createElement: Function): VNode
    {
        let directives = [];

        if (this.mask.length) {
            directives.push({
                name: 'mask',
                value: this.mask
            });
        }

        return createElement('v-text-field', {
            attrs: this.$attrs,
            directives,
            props: this.getProps(),
            on: this.$listeners
        });
    }
}

</script>
