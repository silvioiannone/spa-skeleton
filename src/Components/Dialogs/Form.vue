<template>
    <dialog-main v-model="model">
        <slot></slot>
    </dialog-main>
</template>

<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import DialogMain                  from './Main.vue';
    import MixinDialogForm             from '../Mixins/Dialog/Form.vue';

    /**
     * This is a dialog that can hold a form in it.
     */
    @Component({
        components: {
            DialogMain
        }
    })
    export default class Form extends Mixins(MixinDialogForm)
    {
    }

</script>
