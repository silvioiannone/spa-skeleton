<script lang="ts">

    import { Component, Mixins, Prop, Watch } from 'vue-property-decorator';
    import { Input }                          from './Input.vue';

    /**
     * This mixin can be used in order to bootstrap the creation of a select box.
     *
     * If the items that you want to be available in the selectbox do not have a value/text
     * properties you can create a `transformItem` in the component using this mixin that will
     * add those two properties to each item. For example:
     *
     *     transformItem(item)
     *     {
     *         item.text = item.first_name + ' ' + item.last_name;
     *         item.value = item.id;
     *
     *         return item;
     *     }
     */
    @Component
    export class Select extends Mixins(Input)
    {
        /**
         * Display chips in the selectbox.
         */
        @Prop({ type: Boolean, default: false }) chips: boolean;

        /**
         * Whether or not to display a button to clean the selectbox.
         */
        @Prop({ type: Boolean, default: false }) clearable: boolean;

        /**
         * Tagging functionality, allows you to enter/navigate/delete items.
         */
        @Prop({ type: Boolean, default: false }) tags: boolean;

        /**
         * Items that will be available in the selectbox.
         */
        @Prop({ type: Array, required: true }) items: Array<any>;

        /**
         * Pass props through to the v-menu component. Accepts either a string for boolean props
         * `menu-props="auto, overflowY"`, or an object
         * `:menu-props="{ auto: true, overflowY: true }`.
         */
        @Prop({ type: Object, default: () => ({
            closeOnClick: false,
            closeOnContentClick: false,
            openOnClick: false,
            maxHeight: 300
        })}) menuProps: object;

        /**
         * Already selected subjects.
         *
         * If it is an array then multiple elements will be allowed to be selected.
         */
        @Prop({ }) value: any;

        /**
         * Item transformation function.
         */
        @Prop({ type: Function, default: () => {} }) transformation: (item: any) => any;

        /**
         * Changes the style of the input
         */
        @Prop({ type: Boolean, default: false }) solo: boolean;

        /**
         * Changes the style of the input.
         */
        @Prop({ type: Boolean, default: false }) outlined: boolean;

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        @Prop({ type: Boolean, default: true }) returnObject: boolean;

        /**
         * Hides hint, validation errors.
         */
         @Prop({ type: Boolean, default: false }) hideDetails: boolean;

        /**
         * Set property of items's value - must be primative. Dot notation is supported.
         */
        @Prop({ type: String, default: 'value' }) itemValue: Array<any> | String | Function;

        /**
         * Appends an icon to the component, uses the same syntax as v-icon.
         */
        @Prop({ type: String, default: () => '$vuetify.icons.dropdown' }) appendIcon: string;

        /**
         * Contains the list of the manually newly created tags.
         */
        addedTags: Array<any> = [];

        /**
         * Selected items.
         */
        _selected: Array<any> = [];

        /**
         * Items available for selection.
         */
        _items: Array<any> = [];

        get multiple(): boolean
        {
            return Array.isArray(this.value);
        }

        /**
         * Fire the needed event.
         */
        fire(selected: any): void
        {
            if (selected === null) {
                this.$emit('input', {});
                return;
            }

            if (this.tags) {
                // Each tag created by Vuetify needs to be transformed and added to the `addedTags`
                // data property.
                selected.forEach((item: any) =>
                {
                    if (typeof item === 'string') {
                        this.addedTags.push(this.transformItem({
                            name: item
                        }));
                    }
                });
            }

            this.$emit('input', selected);
        }

        /**
         * Transform the items.
         */
        transformItems(): void
        {
            this.$data._items = this.items.map((item: any) => this._transformItem(item));
        }

        /**
         * Transform a item so that it can be used by the select box.
         */
        _transformItem(item: any)
        {
            let localItem = {...item};

            return this.transformItem(localItem);
        }

        /**
         * Init the selected items.
         */
        initSelected(): void
        {
            if (this.multiple) {
                this.$data._selected = this.value
                    .filter((selected: any) => typeof selected !== 'undefined')
                    .map((selected: any) =>
                        this.$data._items.find((item: any) => item.id === selected.id) || selected);
            } else {
                if (typeof this.value !== 'undefined') {
                    this.$data._selected = this._transformItem(this.value);
                }
            }
        }

        /**
         * Override this function if the item should be transformed.
         */
        transformItem(item: any): any
        {
            return item;
        }

        created()
        {
            this.transformItem = this.transformation;
        }

        @Watch('items', { immediate: true })
        onItemsChange()
        {
            this.transformItems();
        }

        @Watch('selected', { immediate: true })
        onSelectedChange()
        {
            this.transformItems();
            this.initSelected();
        }
    }

    export default Select;

</script>
