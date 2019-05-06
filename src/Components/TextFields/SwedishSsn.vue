<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { TextField }               from '../Mixins/TextField.vue';

    @Component
    export class TextFieldSwedishSsn extends Mixins(TextField)
    {
        /**
         * Social security number.
         */
        @Prop({ type: String, default: 'Social security number' }) label: string;

        /**
         * Input field name.
         */
        @Prop({ type: String, default: 'ssn' }) name: string;

        /**
         * Mask.
         */
        @Prop({ type: String, default: '######-####' }) mask: string;

        /**
         * Returns the unmodified masked string.
         */
        @Prop({ type: Boolean, default: true }) returnMaskedValue: boolean;

        get _validation(): any
        {
            if (typeof this.validation === 'string') {
                return this.validation.concat('|', 'swedishSsn');
            } else {
                return {
                    ...this.validation,
                    swedishSsn: true
                }
            }
        }
    }

    export default TextFieldSwedishSsn;

</script>
