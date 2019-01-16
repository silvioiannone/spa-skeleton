<template>
    <v-snackbar v-model="visible" :error="error" :timeout="timeout" :color="color">
        {{ message }}
        <v-btn flat class="white--text" @click="visible = false" :dark="error">Close</v-btn>
    </v-snackbar>
</template>

<script lang="ts">

    import Vue           from 'vue';
    import { Component } from 'vue-property-decorator';

    interface SnackbarEvent {
        message: string;
        color: string;
        timeout: number;
        error: boolean;
    }

    @Component
    export default class SnackbarGlobal extends Vue
    {
        /**
         * The color of the message.
         */
        color: string = 'primary';

        /**
         * Display an error snackbar.
         */
        error: boolean = false;

        /**
         * Message.
         */
        message: string = '';

        /**
         * Visibility timeout.
         */
        timeout: number = 2000;

        /**
         * Controls the snackbar visibilty.
         */
        visible: boolean = false;

        mounted()
        {
            this.$eh.$on('SnackbarDisplayMessage', (event: SnackbarEvent) =>
            {
                if(typeof event === 'string')
                {
                    this.message = event;
                }
                else
                {
                    this.message = event.message;
                }

                this.color = event.color || 'primary';
                this.timeout = event.timeout || 2000;
                this.visible = true;
                this.error = !!event.error;
            });
        }
    }

</script>
