<script lang="ts">

import TextFieldMain from './Main.vue';

export default {

    name: 'TextFieldSwedishSsn',

    mixins: [TextFieldMain],

    props: {
        /**
         * Social security number.
         */
        label: { type: String, default: 'Social security number' },

        /**
         * Input field name.
         */
        name: { type: String, default: 'ssn' },

        /**
         * Mask.
         */
        mask: { type: String, default: '######-####' },

        /**
         * Returns the unmodified masked string.
         */
        returnMaskedValue: { type: Boolean, default: true }
    },

    computed: {
        _validation(): any
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
}

</script>
