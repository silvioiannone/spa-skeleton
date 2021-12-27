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

import DayJS from 'dayjs';

let interval: any = null;

export default {

    name: 'TimeFromNow',

    props: {
        /**
         * The time that will be displayed in a human readable format.
         */
        time: { type: String, required: true },

        /**
         * Display a tooltip that will show the exact time.
         */
        tooltip: { type: Boolean, required: false }
    },

    data()
    {
        return {
            _time: ''
        }
    },

    methods: {
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
    },

    mounted()
    {
        this.update();
        interval = setInterval(this.update, 1000);
    },

    destroyed()
    {
        clearInterval(interval);
    },

    watch: {
        time(): void
        {
            this.update();
        }
    }
}

</script>
