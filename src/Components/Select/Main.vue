<script lang="ts">

    import { VNode, CreateElement } from 'vue';
    import { Component, Mixins }    from 'vue-property-decorator';
    import Select from '../Mixins/Select.vue';
    import Validatable from '../Mixins/Components/Validatable.vue';

    @Component
    export class SelectMain extends Mixins(Select, Validatable)
    {
        get selectProps(): any
        {
            let props = {
                ...this.$props,
                outlined: this._outlined
            };

            // The rules will only be passed to the `validation-provider` component.
            delete props['rules'];

            return props;
        }

        render(createElement: CreateElement): VNode
        {
            let scopedSlots = this.$vnode.data ? this.$vnode.data.scopedSlots : undefined;

            return createElement('validation-provider', {
                props: {
                    rules: this.rules,
                    name: this.name,
                    vid: this.name
                },
                scopedSlots: {
                    default: (props: { errors: any }): VNode => createElement('v-select', {
                        attrs: {
                            name: this.name
                        },
                        props: {
                            ...this.selectProps,
                            errorMessages: props.errors
                        },
                        on: {
                            ...this.$listeners,
                            input: (value: any) => this.fire(value)
                        },
                        scopedSlots
                    })
                },
                ref: 'validationProvider'
            }, []);
        }
    }

    export default SelectMain;

</script>
