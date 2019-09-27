<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { TextFieldMain }           from './Main.vue';
    import { Wrapper }                 from '../Mixins/Wrapper.vue';

    @Component
    export class TextFieldSwedishSsn extends Mixins(Wrapper, TextFieldMain)
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

        __component = TextFieldMain;

        get _validation(): any
        {
            if (typeof this.rules === 'string') {
                return this.rules.concat('|', 'swedishSsn');
            } else {
                return {
                    ...this.rules,
                    swedishSsn: true
                }
            }
        }
    }

    export default TextFieldSwedishSsn;

</script>
