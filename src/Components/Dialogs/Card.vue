<template>
    <dialog-main v-bind="getProps()" v-on="getOn()">
        <v-card>
            <v-card-title class="headline">{{ this.title }}</v-card-title>
            <v-card-text>
                <slot></slot>
            </v-card-text>
        </v-card>
    </dialog-main>
</template>

<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Wrapper }                 from '../Mixins/Wrapper.vue';
    import { DialogMain }              from './Main.vue';

    @Component({
        components: {
            DialogMain
        }
    })
    export class DialogCard extends Mixins(Wrapper)
    {
        /**
         * Dialog title.
         */
        @Prop({ type: String, default: '' }) title: string;

        __component = DialogMain;
    }

    export default DialogCard;

</script>
