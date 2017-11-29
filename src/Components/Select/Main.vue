<script>

    import Select from '../Mixins/Select.vue';

    export default {

        name: 'SelectMain',

        mixins: [
            Select
        ],

        computed: {

            hasSlots()
            {
                return !!this.$scopedSlots.selection || !!this.$scopedSlots.item;
            }
        },

        render(createElement)
        {
            let self = this;

            return createElement(
                'v-select',
                {
                    props: {
                        autocomplete: true,
                        chips: this.chips,
                        clearable: this.clearable,
                        items: this.$data._models,
                        label: this.label,
                        multiple: this.multiple,
                        returnObject: true,
                        value: this.$data._selected
                    },
                    on: {
                        input: value => {
                            //this.$emit('selected', value);
                            this.fire(value)
                        }
                    },
                    scopedSlots: this.$vnode.data.scopedSlots
                }
            )
        }
    }

</script>
