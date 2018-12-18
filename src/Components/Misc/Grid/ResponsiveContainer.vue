<script lang="ts">

    import Vue, { VNode } from 'vue';

    export default Vue.extend({

        name: 'ResponsiveContainer',

        computed: {

            attrs(): any
            {
                return Object.keys(this.$attrs).filter((key: string) =>
                {
                    if (key === 'slot') {
                        return false;
                    }

                    let value = this.$attrs[key];

                    return value || typeof value === 'string';
                });
            },

            class(): any
            {
                let classes = {
                    'container': true,
                    'responsive-container': true
                };

                if (this.$vuetify.breakpoint.xs) {
                    classes['pa-0'] = true;
                }

                this.attrs.forEach((attribute: string) =>
                {
                    classes[attribute] = true;
                });

                return classes;
            }
        },

        render(createElement: Function): VNode
        {
            return createElement('v-container', {
                class: this.class,
                attrs: this.attrs
            }, this.$slots.default);
        }
    });

</script>
