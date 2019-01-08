<template>
    <v-tooltip v-if="tooltip" top>
        <span slot="activator">{{ $data._time }}</span>
        <span>{{ time }}</span>
    </v-tooltip>
    <span v-else>{{ $data._time }}</span>
</template>

<script lang="ts">

    import Vue                        from 'vue';
    import { Component, Prop, Watch } from 'vue-property-decorator';
    import Moment                     from 'moment';
    import Config                     from '../../Config';

    let interval: any = null;

    @Component
    export default class TimeFromNow extends Vue
    {
        /**
         * The time that will be displayed in a human readable format.
         */
        @Prop({ type: String, required: true }) time: string;

        /**
         * Display a tooltip that will show the exact time.
         */
        @Prop({ type: Boolean, required: false }) tooltip: false;

        _time: string = '';

        update()
        {
            this.$data._time = Moment.utc(this.time)
                .local()
                .locale(Config.locale)
                .fromNow();
        }

        @Watch('time')
        onTimeChange()
        {
            this.update();
        }

        mounted()
        {
            this.update();
            interval = setInterval(this.update, 1000);
        }

        destroyed()
        {
            clearInterval(interval);
        }
    }

</script>
