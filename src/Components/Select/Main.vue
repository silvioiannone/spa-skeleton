<script>

    import Select from '../Mixins/Select.vue';

    export default {

        name: 'SelectMain',

        mixins: [
            Select
        ],

        render(createElement)
        {
            return createElement(
                'v-select',
                {
                    props: this.$props,
                    on: {
                        input: value => this.fire(value)
                    },
                    scopedSlots: this.$vnode.data.scopedSlots
                }
            )
        }
    }

</script>
