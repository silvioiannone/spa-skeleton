<template>
    <router-view></router-view>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import RootMixin             from '../Mixins/Root';

    @Component
    export default class Root extends Mixins(RootMixin)
    {
        created()
        {
            this.$ws.connect();
        }
    }

</script>
