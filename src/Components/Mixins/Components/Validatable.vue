<script lang="ts">

export default {

    name: 'Validatable',

    props: {
        /**
         * Input label.
         */
        label: { type: String, default: '' },

        /**
         * Value of the name attribute.
         */
        name: { type: String, default: '' },

        /**
         * Validation rules.
         */
        rules: { type: String, default: '' },

        /**
         * Field name for validation purposes.
         *
         * Overwrites the `name` prop.
         */
        validationName: { type: String, default: '' }
    },

    methods: {

        /**
         * Handle the `blur` event fired by `v-text-field` component.
         */
        handleBlur(): void
        {
            (this.$refs.validationProvider as any).validate();
        }
    }
}

</script>
