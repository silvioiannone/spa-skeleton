<template>
    <v-autocomplete :value="$data._selected"
                    :items="$data._items"
                    :item-value="itemValue"
                    :item-text="itemText"
                    :loading="$data._loading"
                    :hide-no-data="hideNoData"
                    return-object
                    cache-items
                    :name="name"
                    v-validate="validation"
                    :vv-as="vvAs"
                    :error-messages="errors.collect(name)"
                    :label="label"
                    :search-input.sync="searchQuery"
                    :filter="filter"
                    :multiple="multiple"
                    :data-vv-as="vvAs">
                    @keydown.enter="stopEnterPropagation"
                    @input="emitInput"
        <template slot="item" slot-scope="{ item, tile }">
            <slot name="item" :item="item" :tile="tile"></slot>
        </template>
        <template slot="selection" slot-scope="{ item, selected }">
            <slot name="selection" :item="item" :selected="selected" :remove="remove"></slot>
        </template>
    </v-autocomplete>
</template>

<script>

    import Autocomplete from '../Mixins/Autocomplete';

    export default {

        name: 'InputAutocomplete',

        mixins: [
            Autocomplete
        ],

        props: {

            /**
             * A search function that returns a promise.
             *
             * The promise should resolve with the items displayed by the dropdown.
             */
            search: {
                type: Function,
                required: true
            },

            /**
             * Set property of items's value.
             */
            itemValue: {
                type: String,
                default: 'id'
            }
        },

        methods: {

            /**
             * Perform the search serverside.
             */
            _search()
            {
                this.search(this.searchQuery)
                    .then(result => {
                        this.$data._items = result;
                        this.$data._loading = false;
                    })
                    .catch(result => {
                        this.$data._loading = false;
                    });
            },

            /**
             * We need to define a custom filter function because of an issue with Vuetify when not
             * using the item-text and item-value props. This way the dropdown menu will always be
             * displayed and the filtering performed server-side.
             */
            filter(item, queryText, itemText) {
                return this.$data._items.find(current => item.id === current.id);
            }
        }
    }

</script>
