<script lang="ts">

    import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component
    export class Breadcrumbs extends Vue
    {
        /**
         * An array containing the items that will be displayed.
         */
        @Prop({ type: Array, default: () => []}) items: Array<any>

        /**
         * Specifies the dividing character.
         */
        @Prop({ type: String, default: '/' }) divider: string;
    }

    export default Breadcrumbs;

</script>
