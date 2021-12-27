<script lang="ts">

import { VNode } from 'vue';
import Button from '../Mixins/Button.vue';
import MixinComponent from '../Mixins/Component.vue';

export default {

    name: 'ButtonMain',

    mixins: [Button, MixinComponent],

    props: {
        action: Function
    },

    data() {
        return {
            _loading: false
        }
    },

    computed: {
        propLoading(): boolean
        {
            return this.$data._loading;
        },

        computedProps(): any
        {
            return {
                loading: this.propLoading
            }
        }
    },

    methods: {

        /**
         * React to `click` event.
         */
        async internalOnClick(event: any): Promise<void>
        {
            if (this.action) {
                this.$data._loading = true;

                try {
                    await this.action();
                } finally {
                    this.$data._loading = false;
                }
            }

            this.$emit('click', event);
        }
    },

    render(createElement: Function): VNode
    {
        return createElement(
            'v-btn',
            {
                props: this.$props,
                on: {
                    ...this.$listeners,
                    click: this.internalOnClick
                }
            },
            this.$slots.default
        );
    }
}

</script>
