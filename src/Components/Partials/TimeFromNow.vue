<template>
    <v-tooltip v-if="tooltip" top>
        <template #activator="data">
            <span slot="activator" v-on="data.on">{{ $data._time }}</span>
        </template>
        <span>{{ time }}</span>
    </v-tooltip>
    <span v-else>{{ $data._time }}</span>
</template>

<script lang="ts">

    import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
    import DayJS from 'dayjs';

    let interval: any = null;

    @Component
    export class TimeFromNow extends Vue
    {
        /**
         * The time that will be displayed in a human readable format.
         */
        @Prop({ type: String, required: true }) time: string;

        /**
         * Display a tooltip that will show the exact time.
         */
        @Prop({ type: Boolean, required: false }) tooltip: boolean;

        _time: string = '';

        /**
         * Update the time.
         */
        update(): void
        {
            this.$data._time = DayJS(this.time)
                .utc()
                .local()
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

    export default TimeFromNow;

</script>
