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
import Autocomplete from '../Mixins/Autocomplete.vue';
import Countries from '../../Assets/Json/CountryPhonePrefixes.json';

export default {
    name: 'AutocompleteCountry',

    mixins: [Autocomplete],

    props: {
        /**
         * Name of the input element.
         */
        name: { type: String, default: 'country' },

        /**
         * Label of the input element.
         */
        label: { type: String, default: 'Country' },

        /**
         * Perform local search.
         */
        local: { type: Boolean, default: true },

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        returnObject: { type: Boolean, default: false }
    },

    data() {
        return {
            countries: Countries || []
        }
    },

    computed: {

        _outlined(): boolean
        {
            return Config.ui.components.textField.defaultStyle === 'outlined';
        }
    },

    methods: {
        /**
         * Filter the autocomplete items when typing.
         */
        _filter(item: { name: string, iso: string }, query: string)
        {
            let searchSubject = item.name.toLowerCase();

            return searchSubject.indexOf(query.toLowerCase()) > -1;
        },

        handleInput(value: any): void
        {
            this.$emit('input', value);
        }
    }
}

</script>
