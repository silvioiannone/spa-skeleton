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
                    props: {
                        autocomplete: true,
                        chips: this.chips,
                        clearable: this.clearable,
                        items: this.$data._models,
                        label: this.label,
                        tags: this.tags,
                        multiple: this.multiple,
                        returnObject: true,
                        value: this.$data._selected
                    },
                    on: {
                        input: value => this.fire(value)
                    },
                    scopedSlots: this.$vnode.data.scopedSlots
                }
            )
        }
    }

</script>
