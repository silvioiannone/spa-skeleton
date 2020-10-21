<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class Chip extends Vue
    {
        /**
         * Adds remove button.
         */
        @Prop({ type: Boolean, default: false }) close: boolean;

        /**
         * Removes circle edges.
         */
        @Prop({ type: Boolean, default: false }) label: boolean;

        /**
         * Removes background and applies border and text color.
         */
        @Prop({ type: Boolean, default: false }) outlined: boolean;

        /**
         * Decreases the chip size.
         */
        @Prop({ type: Boolean, default: false }) small: boolean;

        /**
         * Decreases the chip size.
         */
        @Prop({ type: Boolean, default: false }) xSmall: boolean;

        /**
         * Makes the component large.
         */
        @Prop({ type: Boolean, default: false }) large: boolean;

        /**
         * Makes the component extra large.
         */
        @Prop({ type: Boolean, default: false }) xLarge: boolean;

        /**
         * Applies specified color to the control - it can be the name of material color (for
         * example `success` or `purple`) or css color (`#033` or `rgba(255, 0, 0, 0.5)`).
         */
        @Prop({ type: String }) color: string;
    }

    export default Chip;

</script>
