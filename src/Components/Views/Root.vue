<template>
    <router-view></router-view>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Root as RootMixin } from '../Mixins/Root.vue';

    @Component
    export class Root extends Mixins(RootMixin)
    {
        created()
        {
            this.$ws.connect(this);
        }
    }

    export default Root;

</script>
