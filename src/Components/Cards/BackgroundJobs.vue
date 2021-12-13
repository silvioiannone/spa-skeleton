<template>
    <card-main v-bind="$props" v-on="$listeners" v-show="jobs.length">
        <slot :jobs="jobs"/>
    </card-main>
</template>

<script lang="ts">

import CardMain from './Main.vue';

export default {

    name: 'CardBackgroundJobs',

    components: {
        CardMain
    },

    mixins: [CardMain],

    data() {
        return {
            jobs: []
        }
    },

    methods: {

        /**
         * Insert a message into a Job.
         */
        insertJobMessage(payload: any): void
        {
            let index = this.jobs.findIndex(_job => payload.id == _job.id);

            if (index >= 0) {
                requestAnimationFrame(() => {
                    this.$set(this.jobs, index, {
                        ...this.jobs[index],
                        message: payload.message
                    });
                });
            }
        },

        /**
         * Insert or update a job.
         */
        insertOrUpdateJob(job: any): void
        {
            let index = this.jobs.findIndex(_job => job.id === _job.id);

            index >= 0 ? this.$set(this.jobs, index, job) : this.jobs.push(job);
        }
    },

    mounted()
    {
        this.$eh.$on(
            '.Bloom\\Cluster\\Kernel\\App\\Events\\Jobs\\Processed',
            (job: any) => this.insertOrUpdateJob(job)
        );
        this.$eh.$on(
            '.Bloom\\Cluster\\Kernel\\App\\Events\\Jobs\\Failed',
            (job: any) => this.insertOrUpdateJob(job)
        );
        this.$eh.$on(
            '.Bloom\\Cluster\\Kernel\\App\\Events\\Jobs\\Processing',
            (job: any) => this.insertOrUpdateJob(job)
        );
        this.$eh.$on(
            '.Bloom\\Cluster\\Kernel\\App\\Events\\Jobs\\Message',
            (message: any) => this.insertJobMessage(message)
        );
    },

    watch: {

        jobs() {
            // Whenever a job is processed or has failed remove it after some time.
            this.jobs.forEach((job: any) => {
                if (job.status === 'processed' || job.status === 'failed') {
                    setTimeout(() => {
                        let index = this.jobs.findIndex(_job => job.id === _job.id);
                        this.$delete(this.jobs, index);
                    }, 8000);
                }
            });
        }
    }
}

</script>
