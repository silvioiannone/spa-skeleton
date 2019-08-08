<script lang="ts">

    import { VNode }                   from 'vue';
    import { Component, Prop, Mixins } from 'vue-property-decorator';
    import { MixinComponent }          from './Component.vue';

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
         * Makes the background transparent.
         */
        @Prop({ type: Boolean, default: false }) text: boolean;

        /**
         * Whether or not the button should be disabled.
         */
        @Prop({ type: Boolean, default: false }) disabled: boolean;

        /**
         * On click callback action.
         *
         * This function should be a callback executor compatible function.
         */
        @Prop({ type: Function }) onClick: () => Promise<any>;

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
                props: this.getProps(),
                on: {
                    ...this.$listeners,
                    click: (event: any) => this.handleClick(event),
                }
            }, this.$slots.default);
        }
    }

    export default Button;

</script>
