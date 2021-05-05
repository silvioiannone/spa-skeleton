<template>
    <error-main :back-button="false" icon="mdi-clock-alert-outline" title="Too many attempts">
        <v-col>
            <p class="my-5 text-center">
                Please wait before making another request. Navigation will automatically
                resume in {{ delta }} seconds.
            </p>
            <v-progress-linear v-model="progress"></v-progress-linear>
        </v-col>
    </error-main>
</template>

<script lang="ts">

    import { Vue, Component } from 'vue-property-decorator';
    import ErrorMain from './Main.vue';

    @Component({
        components: {
            ErrorMain
        }
    })
    export class ErrorTooManyAttempts extends Vue
    {
        interval: number;

        initialTimestampDelta: number = 0;

        currentTimestampDelta: number = 0;

        currentTimestamp: number = 0;

        get error(): any
        {
            return this.$store.getters.app.error;
        }

        get progress(): number
        {
            return 100 * this.currentTimestampDelta / this.initialTimestampDelta;
        }

        get resetTimestamp(): number
        {
            return this.error.headers['x-ratelimit-reset'];
        }

        get delta(): number
        {
            return this.resetTimestamp - this.currentTimestamp;
        }

        mounted()
        {
            this.currentTimestamp = Math.floor(Date.now() / 1000);
            this.initialTimestampDelta = this.resetTimestamp - this.currentTimestamp;
            this.currentTimestampDelta = this.initialTimestampDelta;

            this.interval = window.setInterval(() =>
            {
                if (this.currentTimestamp < this.resetTimestamp) {
                    this.currentTimestamp++;
                    this.currentTimestampDelta = this.resetTimestamp - this.currentTimestamp;
                } else {
                    clearInterval(<number>this.interval);
                    this.$nextTick(() =>
                    {
                        this.$navigator.refresh();
                    });
                }
            }, 1000);
        }
    }

    export default ErrorTooManyAttempts;

</script>
