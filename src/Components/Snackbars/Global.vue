<template>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color" :multi-line="multiLine">
        {{ message }}
        <template #action="{ attrs }">
            <v-btn v-bind="attrs" text class="white--text" @click="visible = false">Close</v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';

    interface SnackbarEvent {
        message: string;
        multiLine: boolean;
        color: string;
        timeout: number;
    }

    @Component
    export class SnackbarGlobal extends Vue
    {
        /**
         * The color of the message.
         */
        color: string = 'primary';

        /**
         * Message.
         */
        message: string = '';

        /**
         * Makes the snackbar higher (mobile).
         */
         multiLine: boolean = false;

        /**
         * Visibility timeout.
         */
        timeout: number = 5000;

        /**
         * Controls the snackbar visibilty.
         */
        visible: boolean = false;

        mounted()
        {
            this.$eh.$on('SnackbarDisplayMessage', (event: SnackbarEvent) =>
            {
                this.message = typeof event === 'string' ? event: event.message;
                this.color = event.color || 'primary';
                this.timeout = event.timeout || 5000;
                this.visible = true;
                this.multiLine = event.multiLine;
            });
        }
    }

    export default SnackbarGlobal;

</script>
