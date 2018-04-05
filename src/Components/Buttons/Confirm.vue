<template>
    <div class="button--submit">
        <v-btn v-if="confirmed" error @click="abort" color="error">Abort ({{ countdown }})</v-btn>
        <v-btn v-if="!showConfirmation" success :disabled="disabled" :color="color"
               @click.stop="handleConfirmation">
            <slot></slot>
        </v-btn>
        <button-submit v-if="showConfirmation && !confirmed" :on-click="handleClick"
                       color="warning">
            {{ verificationText }}
        </button-submit>
    </div>
</template>

<style>

    .button--submit {
        display: inline;
    }

</style>

<script>

    import ButtonSubmit from './Submit.vue';

    let abortCountdown;

    export default
    {
        mixins: [
            ButtonSubmit
        ],

        props: {

            /**
             * Whether or not the button should be disabled.
             */
            disabled: {
                type: Boolean,
                default: false
            },

            /**
             * What to do once the action is confirmed. It should be a function returning a Promise.
             */
            afterConfirmation: {
                type: Function
            },

            /**
             * Text that will be displayed on the button after the first click.
             */
            verificationText: {
                type: String,
                default: 'Are you sure?'
            }
        },

        data()
        {
            return {
                confirmed: false,
                countdown: 10,
                showConfirmation: false
            }
        },

        methods:
        {
            /**
             * Abort the action.
             */
            abort()
            {
                this.confirmed = false;
                this.showConfirmation = false;
                this.countdown = 10;

                clearInterval(abortCountdown);
            },

            /**
             * Handles the click on the button.
             *
             * @param resolve
             * @param reject
             */
            handleClick(resolve, reject)
            {
                let self = this;
                this.confirmed = true;

                abortCountdown = setInterval(() =>
                {
                    self.countdown--;

                    if(self.countdown === 0)
                    {
                        clearInterval(abortCountdown);

                        this.afterConfirmation()
                            .then(() => {
                                this.confirmed = false;
                                this.showConfirmation = false;
                                resolve();
                            })
                            .catch(() => {
                                this.confirmed = false;
                                this.showConfirmation = false;
                                reject();
                            });
                    }
                }, 1000);
            },

            /**
             * Handles the confirmation.
             */
            handleConfirmation()
            {
                this.showConfirmation = true;

                setTimeout(() => {
                    if(!this.confirmed)
                    {
                        this.showConfirmation = false;
                    }
                }, 3000);
            }
        }
    }
</script>
