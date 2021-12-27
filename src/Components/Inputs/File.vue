<script lang="ts">

import { VNode } from 'vue';
import TextField from '../Mixins/TextField.vue';

export default {

    name: 'InputFile',

    mixins: [TextField],

    computed: {
        props(): any
        {
            return {
                ...this.$props,
                label: this._label,
                outlined: this._outlined
            };
        }
    },

    /**
     * Render the component.
     */
    render(createElement: Function): VNode
    {
        return createElement('v-file-input', {
            on: this.$listeners,
            props: this.props,
            attrs: this.$attrs
        });
    }
}

</script>
