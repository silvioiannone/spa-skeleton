<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { Route }                 from 'vue-router';

    import '../../../Library/ComponentHooks';

    interface Head {
        title?: null | string,
        description?: null | string
    }

    /**
     * This mixin allows the head HTML tag content to be set dynamically.
     */
    @Component
    export class Headful extends Vue
    {
        head: Head = {
            title: null,
            description: null
        }

        /**
         * Refresh the head tag's content.
         */
        refreshHead(): void
        {
            this.setTitle();
            this.setDescription();
        }

        /**
         * Set the head description.
         */
        setDescription(): void
        {
            if (this.head.description) {
                this.$head.description(this.head.description);
            }
        }

        /**
         * Set the head title.
         */
        setTitle(): void
        {
            if (this.head.title) {
                this.$head.title(this.head.title);
            }
        }

        beforeRouteEnter(to: Route, from: Route, next: Function) {
            next((vm: Headful) => {
                vm.refreshHead();
            });
        }

        beforeRouteUpdate(to: Route, from: Route, next: Function) {
            this.refreshHead();
            next();
        }

        @Watch('head')
        onHeadChange()
        {
            this.refreshHead();
        }
    }

    export default Headful;

</script>
