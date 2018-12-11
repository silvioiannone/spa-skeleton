<script lang="ts">

    import Button       from '../Mixins/Button';
    import Component    from '../Mixins/Component';
    import Vue, {VNode} from 'vue';

    export default Vue.extend({

        name: 'ButtonMain',

        mixins: [
            Button,
            Component
        ],

        props: {

            /**
             * An action that will be performed when clicking on the button.
             */
            action: {
                validator: (value) =>
                {
                    return typeof value === 'function';
                }
            }
        },

        data()
        {
            return {
                _loading: false
            }
        },

        computed: {

            propLoading()
            {
                return this.$data._loading;
            },

            computedProps()
            {
                return {
                    loading: this.propLoading
                }
            }
        },

        methods: {

            /**
             * React to `click` event.
             */
            onClick()
            {
                if (this.action) {
                    this.$data._loading = true;

                    this.action()
                        .then(() =>
                        {
                            this.$data._loading = false;
                        })
                        .catch(() =>
                        {
                            this.$data._loading = false;
                        });
                }

                this.$emit('click', event);
            }
        },

        render(createElement): VNode
        {
            return createElement(
                'v-btn',
                {
                    props: this.getProps(),
                    on: {
                        click: this.onClick
                    }
                },
                this.$slots.default
            );
        }
    });

</script>
