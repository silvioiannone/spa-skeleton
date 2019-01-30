<template>
    <card-main v-on="getOn()" v-bind="getProps()">
        <v-card-text>
            <slot></slot>
        </v-card-text>
    </card-main>
</template>

<script lang="ts">

    import { Component, Mixins } from 'vue-property-decorator';
    import Wrapper               from '../Mixins/Wrapper.vue';
    import CardMain              from './Main.vue';

    @Component({
        components: {
            CardMain
        }
    })
    export default class CardForm extends Mixins(Wrapper)
    {
        __component = CardMain;

        /**
         * Propagates the cancel form event to the parent.
         */
        bubbleCancelEvent(event: Event)
        {
            this.$emit('cancel', event);
        }

        /**
         * Propagates the submit form event to the parent.
         */
        bubbleSubmitEvent(event: Event)
        {
            this.$emit('submit', event)
        }
    }

</script>
