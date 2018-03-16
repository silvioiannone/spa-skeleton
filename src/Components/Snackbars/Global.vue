<template>
    <v-snackbar v-model="visible" class="mb-3" :error="error" :timeout="timeout" :color="color">
        {{ message }}
        <v-btn flat class="white--text" @click="visible = false" :dark="error">Close</v-btn>
    </v-snackbar>
</template>

<script>

    export default
    {
        name: 'SnackbarGlobal',

        data()
        {
            return {

                /**
                 * Display an error snackbar.
                 */
                error: false,

                /**
                 * The color of the message.
                 */
                color: 'primary',

                /**
                 * Message.
                 */
                message: '',

                /**
                 * Visibility timeout.
                 */
                timeout: 2000,

                /**
                 * Controls the snackbar visibilty.
                 */
                visible: false
            }
        },

        mounted()
        {
            this.$eh.$on('SnackbarDisplayMessage', event =>
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
