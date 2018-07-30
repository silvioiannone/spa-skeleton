<script>

    import MixinTextField from '../Mixins/TextField';

    export default {

        name: 'TextFieldSearch',

        props: {

            /**
             * Placeholder.
             */
            placeholder: {
                type: String,
                default: 'Search...'
            },

            /**
             * Display the text field with a "solo" style.
             */
            solo: {
                type: Boolean,
                default: true
            },

            /**
             * Append an incon to the text field.
             */
            appendIcon: {
                type: String,
                default: 'search'
            },

            /**
             * Make the text field clearable.
             */
            clearable: {
                type: Boolean,
                default: true
            },

            /**
             * Value of the name attribute.
             */
            name: {
                type: String,
                default: 'search'
            },
        },

        mixins: [
            MixinTextField
        ]
    }

</script>
