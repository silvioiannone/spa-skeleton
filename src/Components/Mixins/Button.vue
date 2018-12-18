<script lang="ts">

    import Vue, {VNode} from 'vue';

    /**
     * This mixin can be used in order to create buttons.
     */
    export default Vue.extend({

        props: {

            /**
             * Applies specified color to the control.
             */
            color: {
                type: String,
                default: ''
            },

            /**
             * Designates the button as icon - round and flat.
             */
            icon: {
                type: Boolean,
                default: false
            },

            /**
             * Display a small button.
             */
            small: {
                type: Boolean,
                default: false
            },

            /**
             * Display a large button.
             */
            large: {
                type: Boolean,
                default: false
            },

            /**
             * Display the button in a loading state.
             */
            loading: {
                type: Boolean,
                default: false
            },

            /**
             * Display a flat button.
             */
            flat: {
                type: Boolean,
                default: false
            }
        },

        methods: {

            /**
             * Override this function in order to define what to do when `click` event is emitted.
             */
            onClick(): void {},

            /**
             * Handle `click` event.
             */
            handleClick(event: any): void
            {
                this.$emit('click', event);
                this.onClick();
            }
        },

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
    });

</script>
