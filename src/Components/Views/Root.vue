<template>
    <router-view></router-view>
</template>

<script>

    export default {

        name: 'RootRouterView',

        mounted()
        {
            this.$ws.subscribe(this);
        }
    }

</script>
