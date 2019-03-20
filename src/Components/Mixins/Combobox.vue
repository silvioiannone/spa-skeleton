<script lang="ts">

    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import TextField                          from './TextField.vue';

    @Component
    export default class Combobox extends Mixins(TextField)
    {
        /**
         * Model.
         */
        @Prop() value: any;

        /**
         * Set property of items's text value.
         */
        @Prop({ type: String, default: '' }) itemText: string;

        /**
         * Displays linear progress bar.
         */
        @Prop({ type: Boolean, default: false }) loading: boolean;

        /**
         * Changes select to multiple. Accepts array for value.
         */
        @Prop({ type: Boolean, default: false }) multiple: boolean;

        /**
         * Perform local search.
         */
        @Prop({ type: Boolean, default: false }) local: boolean;

        /**
         * Do not apply filtering when searching. Useful when data is being filtered server side.
         */
        @Prop({ type: Boolean, default: false }) noFilter: boolean;

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        @Prop({ type: Boolean, default: false }) returnObject: boolean;

        /**
         * Changes display of selections to chips.
         */
        @Prop({ type: Boolean, default: false }) chips: boolean;

        /**
         * When searching, will always highlight the first option.
         */
        @Prop({ type: Boolean, default: false }) autoSelectFirst: boolean;

        /**
         * Adds a remove icon to selected chips.
         */
         @Prop({ type: Boolean, default: false }) deletableChips: boolean;

        _loading: boolean = false;

        _items: Array<any> = [];

        _selected = null;

        searchQuery: string = '';

        timeout: NodeJS.Timeout | null = null;

        /**
         * Emit the input event.
         */
        handleInput(value: Array<any>): void
        {
            this.$data._selected = value.filter((selected: any) => selected !== '');
            this.$emit('input', this.$data._selected);
        }

        /**
         * Handle the change event fired by the `v-combobox`.
         */
        handleChange()
        {
            // When the `change` event is fired it means that a selection has been performed.
            // In this case we need to reset the current search query.
            (<any>this.$refs.combobox).lazySearch = '';
        }

        /**
         * Handle the search.
         */
        handleSearch(): void
        {
            // Don't perform the search if we already retrieved the items from the server.
            if (this.local && this.$data._items.length) {
                return;
            }

            this.$data._loading = true;

            if (this.timeout) {
                clearTimeout(this.timeout);
            }

            this.timeout = setTimeout(() =>
            {
                this._search();
            }, 250);
        }

        /**
         * Override this method in order to define what to do when querying the search.
         */
        _search() {}

        /**
         * Stop the propagation of the enter keypress event.
         *
         * This is needed in order to avoid accidentally submitting the form containing this input
         * element.
         */
        stopEnterPropagation(event: any): void
        {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }

        @Watch('searchQuery', { immediate: true })
        onSearchQueryChange()
        {
            this.handleSearch();
        }

        @Watch('value', { immediate: true })
        onValueChange()
        {
            this.$data._selected = this.value;
        }
    }

</script>
