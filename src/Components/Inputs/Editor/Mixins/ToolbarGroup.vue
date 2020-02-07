<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class ToolbarGroup extends Vue
    {
        /**
         * Display smaller buttons.
         */
        @Prop({ type: Boolean, default: false }) small: boolean;

        get buttonProps()
        {
            return {
                small: this.small
            }
        }
    }

    export default ToolbarGroup;

</script>
