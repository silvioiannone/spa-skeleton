<template>
    <v-container>
        <v-layout>
            <slot></slot>
        </v-layout>
        <v-layout>
            <v-flex xs12>
                <div class="text-xs-center">
                    <v-btn color="primary" large @click="goBack()" v-if="backButton">
                        <v-icon left>arrow_back</v-icon>Go back
                    </v-btn>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    export default
    {
        name: 'Error',

        props: {

            /**
             * Whether or not to display the back button.
             */
            backButton: {
                type: Boolean,
                default: true
            }
        },

        computed: {

            app()
            {
                return this.$store.getters.app;
            }
        },

        methods: {

            goBack()
            {
                window.history.back();
            }
        }
    }

</script>
