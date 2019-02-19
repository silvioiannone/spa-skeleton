<template>
    <div class="button--submit">
        <v-btn v-if="confirmed" error @click="abort" color="error" :flat="flat" :large="large">
            <div>Abort</div>
            <v-progress-circular class="ml-3" :value="progress" :rotate="270"></v-progress-circular>
        </v-btn>
        <v-btn v-if="!showConfirmation" success :disabled="disabled" :color="color" :flat="flat"
               :large="large" @click.stop="handleConfirmation">
            <slot></slot>
        </v-btn>
        <button-submit v-if="showConfirmation && !confirmed" :on-click="verificationClick"
                       :flat="flat" color="warning" :large="large">
            {{ verificationText }}
        </button-submit>
    </div>
</template>

<style>

    .button--submit {
        display: inline;
    }

</style>

<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import Button                      from '../Mixins/Button.vue';

    @Component
    export default class ButtonConfirm extends Mixins(Button)
    {
        /**
         * What to do once the action is confirmed. It should be a function returning a Promise.
         */
        @Prop({ type: Function }) afterConfirmation: () => Promise<any>;

        /**
         * Text that will be displayed on the button after the first click.
         */
        @Prop({ type: String, default: 'Are you sure?' }) verificationText: string;

        /**
         * Abort button timeout (in seconds).
         */
        @Prop({ type: Number, default: 10 }) timeout: number;

        confirmed = false;

        countdown = this.timeout;

        progress = 100;

        showConfirmation = false;

        abortCountdown = null;

        /**
         * Abort the action.
         */
        abort()
        {
            this.reset();

            clearInterval(<any>this.abortCountdown);
        };

        reset()
        {
            this.confirmed = false;
            this.showConfirmation = false;
            this.progress = 100;
            this.countdown = this.timeout;
        }

        /**
         * Handles the click on the button.
         *
         * @param resolve
         * @param reject
         */
        async verificationClick(resolve: Function, reject: Function): Promise<any>
        {
            this.confirmed = true;

            this.abortCountdown = <any>setInterval(async () =>
            {
                this.countdown--;
                this.progress = this.countdown / this.timeout * 100;

                if(this.countdown === 0)
                {
                    clearInterval(<any>this.abortCountdown);

                    let error;

                    try {
                        await this.afterConfirmation();
                    } catch (_error) {
                        error = _error;
                    }

                    this.reset();

                    if (error) {
                        throw error;
                    }
                }
            }, 1000);
        }

        /**
         * Handles the confirmation.
         */
        handleConfirmation(): void
        {
            this.showConfirmation = true;

            setTimeout(() => {
                if(!this.confirmed)
                {
                    this.showConfirmation = false;
                }
            }, 3000)
        }
    }

</script>
