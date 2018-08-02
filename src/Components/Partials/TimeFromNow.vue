<template>
    <v-tooltip v-if="tooltip" top>
        <span slot="activator">{{ $data._time }}</span>
        <span>{{ time }}</span>
    </v-tooltip>
    <span v-else>{{ $data._time }}</span>
</template>

<script>

    import Moment from 'moment';

    let interval = null;

    export default {

        name: 'TimeFromNow',

        props: {

            /**
             * The time that will be displayed in a human readable format.
             */
            time: {
                type: String,
                required: true
            },

            /**
             * Display a tooltip that will show the exact time.
             */
            tooltip: {
                type: Boolean,
                required: false
            }
        },

        data()
        {
            return {
                _time: ''
            }
        },

        methods: {

            update()
            {
                this.$data._time = Moment.utc(this.time).local().fromNow();
            }
        },

        watch: {

            time()
            {
                this.update();
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
        }
    }

</script>
