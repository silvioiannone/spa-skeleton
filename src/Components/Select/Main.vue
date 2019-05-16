<script lang="ts">

    import { VNode, CreateElement }    from 'vue';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Select }                  from '../Mixins/Select.vue';

    @Component
    export class SelectMain extends Mixins(Select)
    {
        /**
         * Set property of items's value - must be primative. Dot notation is supported.
         */
        @Prop({ type: String, default: 'identifier' }) itemValue: Array<any> | String | Function;

        render(createElement: CreateElement): VNode
        {
            let scopedSlots = this.$vnode.data ? this.$vnode.data.scopedSlots : undefined;

            let props = {
                ...this.$props,
                multiple: this.multiple
            }

            return createElement(
                'v-select',
                {
                    attrs: {
                        name: this.name
                    },
                    props,
                    on: {
                        ...this.$listeners,
                        input: (value: any) => this.fire(value),
                    },
                    scopedSlots
                }
            )
        }
    }

    export default SelectMain;

</script>
