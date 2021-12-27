<template>
    <dialog-main v-bind="$props" v-on="$listeners">
        <v-card>
            <v-card-title class="text-h5">{{ this.title }}</v-card-title>
            <v-card-text>
                <slot/>
            </v-card-text>
            <v-card-actions v-if="$slots.actions">
                <slot name="actions"/>
            </v-card-actions>
        </v-card>
    </dialog-main>
</template>

<script lang="ts">

import DialogMain from './Main.vue';

export default {

    name: 'DialogCard',

    mixins: [DialogMain],

    components: {
        DialogMain
    },

    props: {

        /**
         * Title displayed by the dialog.
         */
        title: { type: String, default: '' }
    }
}

</script>
