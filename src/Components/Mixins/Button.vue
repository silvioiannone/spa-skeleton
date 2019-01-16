<script lang="ts">

    import Vue, { VNode }      from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    /**
     * This mixin can be used in order to create buttons.
     */
    @Component
    export default class Button extends Vue
    {
        /**
         * Applies specified color to the control.
         */
        @Prop({ type: String, default: '' }) color: string;

        /**
         * Designates the button as icon - round and flat.
         */
        @Prop({ type: Boolean, default: false }) icon: boolean;

        /**
         * Designates the button as icon - round and flat.
         */
        @Prop({ type: Boolean, default: false }) small: boolean;

        /**
         * Display a large button.
         */
        @Prop({ type: Boolean, default: false }) large: boolean;

        /**
         * Display the button in a loading state.
         */
        @Prop({ type: Boolean, default: false }) loading: boolean;

        /**
         * Display a flat button.
         */
        @Prop({ type: Boolean, default: false }) flat: boolean;

        /**
         * Override this function in order to define what to do when `click` event is emitted.
         */
        onClick(): void {}

        /**
         * Handle `click` event.
         */
        handleClick(event: any): void
        {
            this.$emit('click', event);
            this.onClick();
        }

        render(createElement: Function): VNode
        {
            let self = this;

            return createElement('v-btn', {
                props: this.$props,
                on: {
                    click: (event: any) => self.handleClick(event)
                }
            }, this.$slots.default);
        }
    }

</script>
