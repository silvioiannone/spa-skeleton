<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import { Input }                   from './Input.vue';

    /**
     * This mixin can be used in order to create text fields.
     *
     * It is possible to override any of the value of the props by defining a computed value with
     * the same name.
     */
    @Component
    export class Textarea extends Mixins(Input)
    {
        /**
         * Applies the alternate outline input style.
         */
        @Prop({ type: Boolean, default: false }) outlined: boolean;

        /**
         * Prepend an icon to the text field.
         */
        @Prop({ type: String, default: '' }) prependIcon: string;
    }

    export default Textarea;

</script>
