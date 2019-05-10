<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';

    /**
     * This mixins should be required by any component that extends the editor functionality.
     */
    @Component
    export class EditorCommand extends Vue
    {
        /**
         * TipTap editor commands prop.
         */
        @Prop({ required: true }) commands: any;

        /**
         * TipTap editor isActive prop.
         */
        @Prop({ required: true }) isActive: any;
    }

    export default EditorCommand;

</script>
