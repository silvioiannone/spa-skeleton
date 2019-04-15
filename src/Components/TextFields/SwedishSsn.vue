<script>

    import TextField from '../Mixins/TextField';

    export {

        name: 'TextFieldSwedishSsn',

        mixins: [
            TextField
        ],

        props: {

            /**
             * Social security number.
             */
            label: {
                type: String,
                default: 'Social security number'
            },

            /**
             * Input field name.
             */
            name: {
                type: String,
                default: 'ssn'
            },

            /**
             * Mask.
             */
            mask: {
                type: String,
                default: '######-####'
            },

            /**
             * Returns the unmodified masked string.
             */
            returnMaskedValue: {
                type: Boolean,
                default: true
            }
        },

        computed: {

            _validation()
            {
                return this.validation.concat('|', 'swedishSsn');
            }
        }
    }

</script>
