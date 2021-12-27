<script lang="ts">

import { VNode } from 'vue';
import MixinComponent from './Component.vue';

export default {

    mixins: [MixinComponent],

    props: {
        /**
         * Applies specified color to the control.
         */
        color: { type: String, default: '' },

        /**
         * Designates the button as icon - round and flat.
         */
        icon: { type: Boolean, default: false },

        /**
         * Makes the background transparent and applies a thin border.
         */
        outlined: { type: Boolean, default: false },

        /**
         * Designates the button as icon - round and flat.
         */
        small: { type: Boolean, default: false },

        /**
         * Display a large button.
         */
        large: { type: Boolean, default: false },

        /**
         * Makes the component extra large.
         */
        xLarge: { type: Boolean, default: false },

        /**
         * Display the button in a loading state.
         */
        loading: { type: Boolean, default: false },

        /**
         * Makes the background transparent.
         */
        text: { type: Boolean, default: false },

        /**
         * Whether or not the button should be disabled.
         */
        disabled: { type: Boolean, default: false },

        /**
         * Designates the button as a floating-action-button - round.
         */
        fab: { type: Boolean, default: false },

        /**
         * Applies position: fixed to the component.
         */
        fixed: { type: Boolean, default: false },

        /**
         * Aligns the component towards the bottom.
         */
        bottom: { type: Boolean, default: false },

        /**
         * Aligns the component to the right
         */
        right: { type: Boolean, default: false },

        /**
         * Aligns the component towards the top.
         */
        top: { type: Boolean, default: false },

        /**
         * Aligns the component to the left.
         */
        left: { type: Boolean, default: false }
    },

    computed: {
        _onClick(): void
        {
            this.onClick();
        }
    },

    methods: {
        /**
         * Handle `click` event.
         */
        handleClick(event: any): any
        {
            this.$emit('click', event);
            this._onClick(event);
        }
    },

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

</script>
