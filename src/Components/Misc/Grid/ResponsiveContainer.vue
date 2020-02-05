<script lang="ts">

    import Vue, { VNode } from 'vue';
    import { Component }  from 'vue-property-decorator';

    @Component
    export class ResponsiveContainer extends Vue
    {
        get attrs(): any
        {
            return Object.keys(this.$attrs).filter((key: string) =>
            {
                if (key === 'slot') {
                    return false;
                }

                let value = this.$attrs[key];

                return value || typeof value === 'string';
            });
        }

        get class(): any
        {
            let classes = {
                'container': true,
                'responsive-container': true
            };

            this.attrs.forEach((attribute: string) =>
            {
                classes[attribute] = true;
            });

            if (this.attrs.indexOf('fluid') >= 0) {
                classes['container--fluid'] = true;
            }

            return classes;
        }

        render(createElement: Function): VNode
        {
            return createElement('v-container', {
                class: this.class,
                attrs: this.attrs
            }, this.$slots.default);
        }
    }

    export default ResponsiveContainer;

</script>
