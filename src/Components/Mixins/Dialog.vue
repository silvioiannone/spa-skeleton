<script lang="ts">

import { VNode, CreateElement } from 'vue';
import MixinComponent from './Component.vue';

export default {

    mixins: [MixinComponent],

    props: {
        /**
         * V-model. Determines the dialog visibility.
         */
        value: { type: Boolean, default: true },

        /**
         * Set the maximum width of the dialog.
         */
        maxWidth: { type: Number, default: 500 },

        /**
         * The dialog will be persistent and that will prevent it from closing when clicking on
         * the backdrop.
         */
        persistent: { type: Boolean, default: false },

        /**
         * Display a fullscreen dialog.
         */
        fullscreen: { type: Boolean, default: false },

        /**
         * When set to true, expects a card, card-title, card-text and card-actions. Additionally,
         * card-text should have specified height. Will set card-text to overflow-y.
         */
        scrollable: { type: Boolean, default: false },

        /**
         * Hides the display of the overlay.
         */
        hideOverlay: { type: Boolean, default: false },

        /**
         * Sets the component transition. Can be one of the built in transitions or your own.
         */
        transition: { type: String, default: 'dialog-transition' },

        /**
         * Will force the components content to render on mounted. This is useful if you have
         * content that will not be rendered in the DOM that you want crawled for SEO.
         */
        eager: { type: Boolean, default: false },

        /**
         * Mark the dialog as closable.
         */
        closable: { type: Boolean, default: false }
    },

    computed: {
        internalFullscreen()
        {
            // Make the dialog fullscreen on extra-small devices.
            return this.fullscreen || this.$vuetify.breakpoint.xs;
        },

        internalClosable()
        {
            return this.closable || this.$vuetify.breakpoint.smAndDown;
        },

        computedProps()
        {
            return {
                fullscreen: this.internalFullscreen
            }
        }
    },

    methods: {
        /**
         * Hide the dialog.
         */
        hide(): void
        {
            this.$emit('input', false);
            this.$emit('cancel');
            this.$emit('hidden');
        }
    },

    render(createElement: CreateElement): VNode
    {
        return createElement('v-dialog', {
            props: this.$props,
            on: {
                ...this.$listeners,
                'click:outside': this.hide
            }
        }, this.$slots.default)
    }
}

</script>
