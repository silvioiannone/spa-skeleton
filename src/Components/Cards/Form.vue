<template>
    <card-main v-on="getOn()" v-bind="getProps()">
        <v-card-text>
            <slot :bubble-cancel="bubbleCancel" :bubble-submit="bubbleSubmit"></slot>
        </v-card-text>
        <v-card-actions v-if="$slots.actions">
            <slot name="actions"></slot>
        </v-card-actions>
    </card-main>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import { Wrapper }           from '../Mixins/Wrapper.vue';
    import { CardMain }          from './Main.vue';

    @Component({
        components: {
            CardMain
        }
    })
    export class CardForm extends Mixins(Wrapper)
    {
        __component = CardMain;

        /**
         * Propagates the cancel form event to the parent.
         */
        bubbleCancel(event: Event): void
        {
            this.$emit('cancel', event);
        }

        /**
         * Propagates the submit form event to the parent.
         */
        bubbleSubmit(event: Event): void
        {
            this.$emit('submit', event)
        }
    }

    export default CardForm;

</script>
