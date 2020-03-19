<script lang="ts">

    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component
    export class Validatable extends Vue
    {
        /**
         * Input label.
         */
        @Prop({ type: String, default: '' }) label: string;

        /**
         * Value of the name attribute.
         */
        @Prop({ type: String, default: '' }) name: string;

        /**
         * Validation rules.
         */
        @Prop({ type: String, default: '' }) rules: any;

        /**
         * Field name for validation purposes.
         *
         * Overwrites the `name` prop.
         */
        @Prop({ type: String, default: '' }) validationName: any;

        /**
         * Handle the `blur` event fired by `v-text-field` component.
         */
        handleBlur(): void
        {
            (this.$refs.validationProvider as any).validate();
        }
    }

    export default Validatable;

</script>
