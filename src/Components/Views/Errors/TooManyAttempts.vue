<template>
    <error-main :back-button="false" icon="mdi-clock-alert-outline" title="Too many attempts">
        <v-col>
            <p class="my-5 text-center">
                Please wait before making another request. Navigation will automatically resume in
                {{ delta }} seconds.
            </p>
            <v-progress-linear v-model="progress"></v-progress-linear>
        </v-col>
    </error-main>
</template>

<script lang="ts">

import ErrorMain from './Main.vue';

export default {

    name: 'ErrorTooManyAttempts',

    components: {
        ErrorMain
    },

    data()
    {
        return {
            interval: null,
            initialTimestampDelta: 0,
            currentTimestampDelta: 0,
            currentTimestamp: 0
        }
    },

    computed: {
        error(): any
        {
            return this.$store.getters.app.error;
        },

        progress(): number
        {
            return 100 * this.currentTimestampDelta / this.initialTimestampDelta;
        },

        resetTimestamp(): number
        {
            return this.error.headers['x-ratelimit-reset'];
        },

        delta(): number
        {
            return this.resetTimestamp - this.currentTimestamp;
        }
    },

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

</script>
