<script lang="ts">

    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import MixinTextField              from '../Mixins/TextField.vue';

    @Component
    export default class TextFieldSearch extends Mixins(MixinTextField)
    {
        /**
         * Placeholder.
         */
        @Prop({ type: String, default: 'Search...' }) placeholder: string;

        /**
         * Display the text field with a "solo" style.
         */
        @Prop({ type: Boolean, default: true }) solo: boolean;

        /**
         * Append an icon to the text field.
         */
        @Prop({ type: String, default: 'search' }) appendIcon: string;

        /**
         * Make the text field clearable.
         */
        @Prop({ type: Boolean, default: true }) clearable: boolean;

        /**
         * Value of the name attribute.
         */
        @Prop({ type: String, default: 'search' }) name: string;
    }

</script>
