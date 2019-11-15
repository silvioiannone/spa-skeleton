<template>
    <div class="d-flex flex-wrap pa-0">
        <slot></slot>
    </div>
</template>

<script lang="ts">

    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export class FormPartial extends Vue
    {

    }

    export default FormPartial;

</script>
