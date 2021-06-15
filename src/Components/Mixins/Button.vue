<script lang="ts">

    import { VNode }                   from 'vue';
    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import MixinComponent from './Component.vue';

    /**
     * This mixin can be used in order to create buttons.
     */
    @Component
    export class Button extends Mixins(MixinComponent)
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
         * Makes the background transparent and applies a thin border.
         */
        @Prop({ type: Boolean, default: false }) outlined: boolean;

        /**
         * Designates the button as icon - round and flat.
         */
        @Prop({ type: Boolean, default: false }) small: boolean;

        /**
         * Display a large button.
         */
        @Prop({ type: Boolean, default: false }) large: boolean;

        /**
         * Makes the component extra large.
         */
         @Prop({ type: Boolean, default: false }) xLarge: boolean;

        /**
         * Display the button in a loading state.
         */
        @Prop({ type: Boolean, default: false }) loading: boolean;

        /**
         * Makes the background transparent.
         */
        @Prop({ type: Boolean, default: false }) text: boolean;

        /**
         * Whether or not the button should be disabled.
         */
        @Prop({ type: Boolean, default: false }) disabled: boolean;

        /**
         * Designates the button as a floating-action-button - round.
         */
        @Prop({ type: Boolean, default: false }) fab: boolean;

        /**
         * Applies position: fixed to the component.
         */
        @Prop({ type: Boolean, default: false }) fixed: boolean;

        /**
         * Aligns the component towards the bottom.
         */
        @Prop({ type: Boolean, default: false }) bottom: boolean;

        /**
         * Aligns the component to the right
         */
        @Prop({ type: Boolean, default: false }) right: boolean;

        /**
         * Aligns the component towards the top.
         */
        @Prop({ type: Boolean, default: false }) top: boolean;

        /**
         * Aligns the component to the left.
         */
        @Prop({ type: Boolean, default: false }) left: boolean;

        _onClick(event: any): void
        {
            this.onClick();
        }

        /**
         * Handle `click` event.
         */
        handleClick(event: any): any
        {
            this.$emit('click', event);
            this._onClick(event);
        }

        render(createElement: Function): VNode
        {
            return createElement('v-btn', {
                props: this.$props,
                on: {
                    ...this.$listeners,
                    click: (event: any) => this.handleClick(event),
                }
            }, this.$slots.default);
        }
    }

    export default Button;

</script>
