<template>
    <v-btn v-on="$listeners" :small="small" icon :value="value" :class="classes"
           :disabled="disabled">
        <v-icon :small="small">{{ icon }}</v-icon>
    </v-btn>
</template>

<script lang="ts">

export default {

    name: 'ButtonToolbar',

    props: {

        /**
         * Display a smaller button.
         */
        small: { type: Boolean, default: false },

        /**
         * Button's value
         */
        value: { type: Number, default: null },

        /**
         * Icon displayed in the button.
         */
        icon: { type: String, default: '' },

        /**
         * Whether the button should be active.
         */
        active: { type: Boolean, default: false },

        /**
         * Whether the button is disabled.
         */
        disabled: { type: Boolean, default: false }
    },

    computed: {

        classes()
        {
            return {
                'v-btn--active': this.active
            }
        }
    }
}

</script>
