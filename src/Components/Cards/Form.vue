<template>
    <card-main v-bind="$props" v-on="$listeners">
        <template #title-actions>
            <slot name="title-actions"/>
        </template>
        <template #default>
            <v-card-text>
                <slot :on="on"/>
            </v-card-text>
            <v-card-actions v-if="$slots.actions">
                <slot name="actions"/>
            </v-card-actions>
        </template>
    </card-main>
</template>

<script lang="ts">

import CardMain from './Main.vue';

export default {

    name: 'CardForm',

    mixins: [CardMain],

    components: {
        CardMain
    },

    props: {
        /**
         * Display a close button.
         */
        closable: ({ type: Boolean, default: false })
    },

    computed: {
        internalClosable(): boolean
        {
            if (this.closable) {
                return true;
            }

            if (this.$vuetify.breakpoint.smAndDown) {
                return true;
            }

            return false;
        },

        on(): { [key: string]: Function }
        {
            return {
                cancel: this.handleCancel,
                submit: this.handleSubmit
            }
        }
    },

    methods: {
        /**
         * Propagates the cancel form event to the parent.
         */
        handleCancel(event: Event): void
        {
            this.$emit('cancel', event);
        },

        /**
         * Propagates the submit form event to the parent.
         */
        handleSubmit(event: Event): void
        {
            this.$emit('submit', event)
        }
    }
}

</script>
