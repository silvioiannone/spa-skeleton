<template>
    <card-main v-on="getOn()" v-bind="getProps()">
        <template #title-actions>
            <slot name="title-actions"/>
        </template>
        <template #default>
            <v-card-text>
                <slot :on="on"/>
            </v-card-text>
            <v-card-actions v-if="$slots.actions">
                <slot name="actions"/>
            </v-card-actions>
        </template>
    </card-main>
</template>

<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Wrapper } from '../Mixins/Wrapper.vue';
    import { CardMain } from './Main.vue';

    @Component({
        components: {
            CardMain
        }
    })
    export class CardForm extends Mixins(Wrapper)
    {
        /**
         * Display a close button.
         */
        @Prop({ type: Boolean, default: false }) closable: boolean;

        __component = CardMain;

        get _closable(): boolean
        {
            if (this.closable) {
                return true;
            }

            if (this.$vuetify.breakpoint.smAndDown) {
                return true;
            }

            return false;
        }

        get on(): { [key: string]: Function }
        {
            return {
                cancel: this.handleCancel,
                submit: this.handleSubmit
            }
        }

        /**
         * Propagates the cancel form event to the parent.
         */
        handleCancel(event: Event): void
        {
            this.$emit('cancel', event);
        }

        /**
         * Propagates the submit form event to the parent.
         */
        handleSubmit(event: Event): void
        {
            this.$emit('submit', event)
        }
    }

    export default CardForm;

</script>
