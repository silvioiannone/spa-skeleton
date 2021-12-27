<script lang="ts">

import MixinComponent from './Component.vue';

/**
 * This mixin can be used in order to create inputs.
 *
 * It is possible to override any of the value of the props by defining a computed value with
 * the same name.
 */
export default {

    mixins: [MixinComponent],

    props: {
        /**
         * v-model
         */
        value: {},

        /**
         * A hint displayed under the text field.
         */
        hint: { type: String, default: '' },

        /**
         * Make the hint always visible.
         */
        persistentHint: { type: Boolean, default: false },

        /**
         * Whether the input is disabled.
         */
        disabled: { type: Boolean, default: false },

        /**
         * Input label.
         */
        label: { type: String, default: '' },

        /**
         * Set the `autocomplete` attribute.
         */
        autocomplete: { type: String },

        /**
         * Puts the input in an error state and passes through custom error messsages. Will be
         * combined with any validations that occur from the rules prop. This field will not
         * trigger validation.
         */
        errorMessages: { type: Array, default: () => ([]) },
    },

    computed: {
        internalLabel(): string
        {
            return this.label.charAt(0).toUpperCase() + this.label.slice(1, this.label.length);
        }
    }
}

</script>
