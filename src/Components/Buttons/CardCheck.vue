<template>
    <v-btn @click.stop="_onClick" absolute fab top right color="primary" small dark
           class="v-btn--card-check elevation-2" :error="localSelected">
        <v-icon v-if="!localSelected">add</v-icon>
        <v-icon v-if="localSelected">remove</v-icon>
    </v-btn>
</template>

<style>

    .v-btn--card-check.v-btn--top.v-btn--absolute.v-btn--small {
        top: 16px;
        right: 16px;
    }

</style>

<script>

    export default
    {
        name: 'ButtonCardCheck',

        props: {

            /**
             * What to do when the button is toggled.
             */
            onToggleSelect: {
                type: Function
            },

            /**
             * Set the button status.
             */
            selected: {
                type: Boolean,
                default: false
            }
        },

        data()
        {
            return {
                localSelected: this.selected
            }
        },

        methods:
        {
            /**
             * Handle on click action.
             */
            _onClick()
            {
                this.localSelected = !this.localSelected;

                this.onToggleSelect();
            }
        },

        watch:
        {
            selected()
            {
                this.localSelected = this.selected;
            }
        }
    }

</script>
