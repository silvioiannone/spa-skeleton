<template>
    <dialog-main v-bind="$props" v-on="$listeners">
        <v-card>
            <v-card-title class="text-h5">{{ this.title }}</v-card-title>
            <v-card-text>
                <slot/>
            </v-card-text>
            <v-card-actions v-if="$slots.actions">
                <slot name="actions"/>
            </v-card-actions>
        </v-card>
    </dialog-main>
</template>

<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import DialogMain from './Main.vue';

    @Component({
        components: {
            DialogMain
        }
    })
    export class DialogCard extends Mixins(DialogMain)
    {
        /**
         * Title displayed by the dialog.
         */
        @Prop({ type: String, default: '' }) title: string;

        __component = DialogMain;
    }

    export default DialogCard;

</script>
