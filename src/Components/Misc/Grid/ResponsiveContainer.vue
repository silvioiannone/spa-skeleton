<script lang="ts">

    import Vue from 'vue';

    export default Vue.extend({

        name: 'ResponsiveContainer',

        computed: {

            attrs()
            {
                return Object.keys(this.$attrs).filter(key =>
                {
                    if (key === 'slot') {
                        return false;
                    }

                    let value = this.$attrs[key];

                    return value || typeof value === 'string';
                });
            },

            class()
            {
                let classes = {
                    'container': true,
                    'responsive-container': true
                };

                if (this.$vuetify.breakpoint.xs) {
                    classes['pa-0'] = true;
                }

                this.attrs.forEach(attribute =>
                {
                    classes[attribute] = true;
                });

                return classes;
            }
        },

        render(createElement)
        {
            let self = this;

            return createElement('v-container', {
                class: this.class,
                attrs: this.attrs
            }, this.$slots.default);
        }
    });

</script>
