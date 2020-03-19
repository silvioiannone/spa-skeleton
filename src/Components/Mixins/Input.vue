<script lang="ts">

    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import { MixinComponent }          from './Component.vue';

    /**
     * This mixin can be used in order to create inputs.
     *
     * It is possible to override any of the value of the props by defining a computed value with
     * the same name.
     */
    @Component
    export class Input extends Mixins(MixinComponent)
    {
        /**
         * v-model
         */
        @Prop() value: any;

        /**
         * A hint displayed under the text field.
         */
        @Prop({ type: String, default: '' }) hint: string;

        /**
         * Make the hint always visible.
         */
        @Prop({ type: Boolean, default: false }) persistentHint: boolean;

        /**
         * Whether the input is disabled.
         */
        @Prop({ type: Boolean, default: false }) disabled: boolean;

        /**
         * Input label.
         */
        @Prop({ type: String, default: '' }) label: string;

        /**
         * Input name attribute.
         */
        @Prop({ type: String, default: ''}) name: string;

        /**
         * Puts the input in an error state and passes through custom error messsages. Will be
         * combined with any validations that occur from the rules prop. This field will not
         * trigger validation.
         */
        @Prop({ type: Array, default: () => []}) errorMessages: Array<any>

        get _label(): string
        {
            return this.label.charAt(0).toUpperCase() + this.label.slice(1, this.label.length);
        }
    }

    export default Input;

</script>
