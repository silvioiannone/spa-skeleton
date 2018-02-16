<template>
    <span>{{ $data._time }}</span>
</template>

<script>

    import Moment from 'moment';

    export default {

        name: 'TimeFromNow',

        props: {

            /**
             * The time that will be displayed in a human readable format.
             */
            time: {
                type: String,
                required: true
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

        mounted()
        {
            this.update();
            setInterval(this.update, 1000);
        }
    }

</script>
