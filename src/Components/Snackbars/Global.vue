<template>
    <v-snackbar v-model="visible" :timeout="timeout" :color="color" :multi-line="multiLine">
        {{ message }}
        <template #action="{ attrs }">
            <v-btn v-bind="attrs" text class="white--text" @click="visible = false">Close</v-btn>
        </template>
    </v-snackbar>
</template>

<script lang="ts">

interface SnackbarEvent {
    message: string;
    multiLine: boolean;
    color: string;
    timeout: number;
}

export default {

    name: 'SnackbarGlobal',

    data()
    {
        return {
            /**
             * The color of the message.
             */
            color: 'primary',

            /**
             * Message.
             */
            message: '',

            /**
             * Makes the snackbar higher (mobile).
             */
            multiLine: false,

            /**
             * Visibility timeout.
             */
            timeout: 5000,

            /**
             * Controls the snackbar visibility.
             */
            visible: false,
        }
    },

    mounted()
    {
        this.$eh.$on('SnackbarDisplayMessage', (event: SnackbarEvent) => {
            this.message = typeof event === 'string' ? event: event.message;
            this.color = event.color || 'primary';
            this.timeout = event.timeout || 5000;
            this.visible = true;
            this.multiLine = event.multiLine;
        });
    }
}

</script>
