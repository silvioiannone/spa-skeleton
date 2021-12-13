<script lang="ts">

import Input from './Input.vue';

/**
 * This mixin can be used in order to create text fields.
 *
 * It is possible to override any of the value of the props by defining a computed value with
 * the same name.
 */
export default {

    mixins: [Input],

    props: {
        /**
         * Applies the alternate outline input style.
         */
        outlined: { type: Boolean, default: false },

        /**
         * Creates counter for input length; if no number is specified, it defaults to 25. Does
         * not apply any validation.
         */
        counter: { default: undefined },

        /**
         * Prepend an icon to the text field.
         */
        prependIcon: { type: String, default: '' },

        /**
         * Default row count.
         */
        rows: { type: Number, default: 5 }
    }
}

</script>
