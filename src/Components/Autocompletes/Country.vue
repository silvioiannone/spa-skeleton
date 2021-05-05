<template>
    <v-autocomplete v-bind="$props" :items="countries" :outlined="outlined || _outlined"
                    item-value="name" :filter="_filter" v-on="$listeners">
        <template #item="{ item }">
            <v-list-item-avatar>
                <span :class="'flag-icon flag-icon-' + item.iso"/>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
        </template>
        <template #selection="{ item }">
            <span :class="'flag-icon flag-icon-' + item.iso" class="mr-2"/>
            {{ item.name }}
        </template>
    </v-autocomplete>
</template>

<script lang="ts">

    import { Config } from '../../Config';
    import { Component, Mixins, Prop } from 'vue-property-decorator';
    import Autocomplete from '../Mixins/Autocomplete.vue';
    import Countries from '../../Assets/Json/CountryPhonePrefixes.json';

    @Component
    export class AutocompleteCountry extends Mixins(Autocomplete)
    {
        /**
         * Name of the input element.
         */
        @Prop({ type: String, default: 'country' }) name: string;

        /**
         * Label of the input element.
         */
        @Prop({ type: String, default: 'Country' }) label: string;

        /**
         * Perform local search.
         */
        @Prop({ type: Boolean, default: true }) local: boolean;

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        @Prop({ type: Boolean, default: false }) returnObject: boolean;

        get _outlined(): boolean
        {
            return Config.ui.components.textField.defaultStyle === 'outlined';
        }

        /**
         * Filter the autocomplete items when typing.
         */
        _filter(item: { name: string, iso: string }, query: string)
        {
            let searchSubject = item.name.toLowerCase();

            return searchSubject.indexOf(query.toLowerCase()) > -1;
        }

        handleInput(value: any): void
        {
            this.$emit('input', value);
        }

        countries: Array<{ name: string, iso: string }> = Countries || [];
    }

    export default AutocompleteCountry;

</script>
