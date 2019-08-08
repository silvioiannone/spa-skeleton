<template>
    <router-view></router-view>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Config }            from '../../Config';
    import { Root as RootMixin } from '../Mixins/Root.vue';

    @Component
    export class Root extends Mixins(RootMixin)
    {
        created()
        {
            this.$ws.connect(this);
            this.$ws.subscribe();

            document.documentElement.setAttribute('lang', Config.locale);
        }
    }

    export default Root;

</script>
