<script lang="ts">

import TextField from '../Mixins/TextField.vue';

export default {

    name: 'TextFieldSearch',

    mixins: [TextField],

    props: {

        /**
         * Append an icon to the text field.
         */
        appendIcon: { type: String, default: 'search' },

        /**
         * Make the text field clearable.
         */
        clearable: { type: Boolean, default: true },

        /**
         * Value of the name attribute.
         */
        name: { type: String, default: 'search' },

        /**
         * Hides hint, validation errors.
         */
        hideDetails: { type: Boolean, default: true },

        /**
         * Display the text field with a "solo" style.
         */
        solo: { type: Boolean, default: true }
    },

    data()
    {
        return {
            __props: {
                placeholder: this.$t('actions.search') + '...'
            }
        }
    }
}

</script>
