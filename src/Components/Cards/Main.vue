<template>
    <v-card>
        <v-card-title class="headline" v-if="title.length">{{ title }}</v-card-title>
        <slot></slot>
    </v-card>
</template>

<script>

    export default {

        name: 'CardMain',

        props: {

            /**
              * Title displayed by the card.
              */
            title: {
                type: String,
                default: ''
            }
        }
    }

</script>
