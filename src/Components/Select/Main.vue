<script lang="ts">

    import { VNode, CreateElement } from 'vue';
    import { Component, Mixins }    from 'vue-property-decorator';
    import Select                   from '../Mixins/Select.vue';

    @Component
    export default class SelectMain extends Mixins(Select)
    {
        render(createElement: CreateElement): VNode
        {
            let scopedSlots = this.$vnode.data ? this.$vnode.data.scopedSlots : undefined;

            return createElement(
                'v-select',
                {
                    attrs: {
                        name: this.name
                    },
                    props: this.$props,
                    on: {
                        input: (value: any) => this.fire(value)
                    },
                    scopedSlots
                }
            )
        }
    }

</script>
