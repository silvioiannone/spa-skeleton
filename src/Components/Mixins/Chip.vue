<script lang="ts">

export default {

    props: {
        /**
         * Adds remove button.
         */
        close: { type: Boolean, default: false },

        /**
         * Removes circle edges.
         */
        label: { type: Boolean, default: false },

        /**
         * Removes background and applies border and text color.
         */
        outlined: { type: Boolean, default: false },

        /**
         * Decreases the chip size.
         */
        small: { type: Boolean, default: false },

        /**
         * Decreases the chip size.
         */
        xSmall: { type: Boolean, default: false },

        /**
         * Makes the component large.
         */
        large: { type: Boolean, default: false },

        /**
         * Makes the component extra large.
         */
        xLarge: { type: Boolean, default: false },

        /**
         * Applies specified color to the control - it can be the name of material color (for
         * example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`).
         */
        color: { type: String }
    }
}

</script>
