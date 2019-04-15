<template>
    <card-main v-bind="getProps()" v-on="getOn()" v-show="jobs.length">
        <slot :jobs="jobs"></slot>
    </card-main>
</template>

<script lang="ts">

    import { Component, Mixins, Watch } from 'vue-property-decorator';
    import { CardMain }                 from './Main.vue';
    import { Wrapper }                  from '../Mixins/Wrapper.vue';

    @Component({
        components: {
            CardMain
        }
    })
    export class CardBackgroundJobs extends Mixins(Wrapper)
    {
        __component = CardMain;

        jobs: Array<any> = [];

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
            )
        }

        /**
         * Insert a message into a Job.
         */
        insertJobMessage(payload: any): void
        {
            let index = this.jobs.findIndex(_job => payload.id == _job.id);

            if (index >= 0) {
                this.$nextTick(() => {
                    this.$set(this.jobs, index, {
                        ...this.jobs[index],
                        message: payload.message
                    });
                });
            }
        }

        /**
         * Insert or update a job.
         */
        insertOrUpdateJob(job: any): void
        {
            let index = this.jobs.findIndex(_job => job.id === _job.id);

            index >= 0 ? this.$set(this.jobs, index, job) : this.jobs.push(job);
        }

        @Watch('jobs')
        onJobsChange()
        {
            // Whenever a job is processed or has failed remove it after some time.
            this.jobs.forEach((job: any) => {
                if (job.status === 'processed' || job.status === 'failed') {
                    setTimeout(() =>
                    {
                        let index = this.jobs.findIndex(_job => job.id === _job.id);
                        this.$delete(this.jobs, index);
                    }, 8000);
                }
            });
        }
    }

    export default CardBackgroundJobs;

</script>
