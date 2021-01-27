<template>
    <div class="button--submit">
        <v-btn v-if="confirmed" error @click="abort" color="error" :text="text" :large="large"
               :x-large="xLarge">
            <div>{{ $t('actions.cancel') }}</div>
            <v-progress-circular class="ml-3" :value="progress" :rotate="270"/>
        </v-btn>
        <v-btn v-if="!showConfirmation" success :disabled="disabled" :color="color" :text="text"
               :large="large" :x-large="xLarge" @click.stop="handleConfirmation">
            <slot/>
        </v-btn>
        <button-submit v-if="showConfirmation && !confirmed" :on-click="verificationClick"
                       :text="text" color="warning" :large="large" :x-large="xLarge">
            {{ _verificationText }}
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
    import { Button }                  from '../Mixins/Button.vue';

    @Component
    export class ButtonConfirm extends Mixins(Button)
    {
        /**
         * What to do once the action is confirmed. It should be a function returning a Promise.
         */
        @Prop({ type: Function }) afterConfirmation: () => Promise<any>;

        /**
         * Text that will be displayed on the button after the first click.
         */
        @Prop({ type: String }) verificationText: string;

        /**
         * Abort button timeout (in seconds).
         */
        @Prop({ type: Number, default: 10 }) timeout: number;

        confirmed = false;

        countdown = this.timeout;

        progress = 100;

        showConfirmation = false;

        abortCountdown = null;

        get _verificationText(): string
        {
            return this.verificationText || this.$t('phrases.are_you_sure') as string;
        }

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

    export default ButtonConfirm;

</script>
