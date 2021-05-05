<script lang="ts">

    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import TextField from './TextField.vue';

    @Component
    export class Combobox extends Mixins(TextField)
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

         /**
          * Hides the menu when there are no options to show. Useful for preventing the menu from
          * opening before results are fetched asynchronously. Also has the effect of opening the
          * menu when the items array changes if not already open.
          */
         @Prop({ type: Boolean, default: false }) hideNoData: boolean;

         /**
          * Do not display in the select menu items that are already selected.
          */
         @Prop({ type: Boolean, default: false }) hideSelected: boolean;

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

            // Whenever something is selected we need also to reset the menu index (an index that
            // keeps track of the menu item currently selected). Why? Because after performing a
            // selection using the keyboard keys (either by typing or using the arrow keys) the menu
            // remembers the last index, so if we try to add a new chip to the combobox that doesn't
            // exist in the menu, and then we press ENTER, it will fail returning an error.
            (<any>this.$refs.combobox).$refs.menu.listIndex = -1;
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
         * Remove an item from the selection.
         */
        remove(item: any): void
        {
            let selected = this.$data._selected;
            let match = selected.find((current: any) => current.id === item.id);

            if (! match) {
                return;
            }

            let index = selected.indexOf(match);
            selected.splice(index, 1);
            this.$emit('input', selected);
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

    export default Combobox;

</script>
