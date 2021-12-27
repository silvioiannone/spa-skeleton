<script lang="ts">

import { Config } from '../../Config';
import Input from './Input.vue';

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
export default {

    mixins: [Input],

    props: {
        /**
         * Display chips in the selectbox.
         */
        chips: { type: Boolean, default: false },

        /**
         * Whether to display a button to clean the selectbox.
         */
        clearable: { type: Boolean, default: false },

        /**
         * Reduces the input height
         */
        dense: { type: Boolean, default: false },

        /**
         * Tagging functionality, allows you to enter/navigate/delete items.
         */
        tags: { type: Boolean, default: false },

        /**
         * Items that will be available in the select-box.
         */
        items: { type: Array, default: () => ([]) },

        /**
         * Pass props through to the v-menu component. Accepts either a string for boolean props
         * `menu-props="auto, overflowY"`, or an object
         * `:menu-props="{ auto: true, overflowY: true }`.
         */
        menuProps: { type: Object, default: () => ({
            closeOnClick: false,
            closeOnContentClick: false,
            openOnClick: false,
            maxHeight: 300
        })},

        /**
         * Already selected subjects.
         *
         * If it is an array then multiple elements will be allowed to be selected.
         */
        value: {},

        /**
         * Item transformation function.
         */
        transformation: { type: Function, default: () => ({}) },

        /**
         * Changes the style of the input
         */
        solo: { type: Boolean, default: false },

        /**
         * Applies the alternate outline input style.
         */
        outlined: { type: Boolean, default: undefined },

        /**
         * Changes select to multiple. Accepts array for value.
         */
        multiple: { type: Boolean, default: false },

        /**
         * Changes the selection behavior to return the object directly rather than the value
         * specified with item-value.
         */
        returnObject: { type: Boolean, default: true },

        /**
         * Hides hint, validation errors.
         */
        hideDetails: { type: Boolean, default: false },

        /**
         * Set property of item's value - must be primitive. Dot notation is supported.
         */
        itemValue: { type: String, default: 'value' },

        /**
         * Appends an icon to the component, uses the same syntax as v-icon.
         */
        appendIcon: { type: String, default: () => '$vuetify.icons.dropdown' },
    },

    data()
    {
        return {
            /**
             * Contains the list of the manually newly created tags.
             */
            addedTags: [],

            /**
             * Selected items.
             */
            _selected: [],

            /**
             * Items available for selection.
             */
            _items: [],
        }
    },

    computed: {
        _outlined(): boolean
        {
            if (this.outlined === undefined) {
                return Config.ui.components.textField.defaultStyle === 'outlined';
            }

            return this.outlined;
        }
    },

    methods: {
        /**
         * Fire the needed event.
         */
        fire(selected: any): void
        {
            if (selected === null) {
                this.returnObject ?
                    this.$emit('input', {}) :
                    this.$emit('input', null);

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
        },

        /**
         * Transform the items.
         */
        transformItems(): void
        {
            if (! this.items) {
                return;
            }

            this.$data._items = this.items.map((item: any) => this._transformItem(item));
        },

        /**
         * Transform a item so that it can be used by the select box.
         */
        _transformItem(item: any)
        {
            let localItem = {...item};

            return this.transformItem(localItem);
        },

        /**
         * Init the selected items.
         */
        initSelected(): void
        {
            if (this.multiple) {
                this.$data._selected = (this.value || [])
                    .filter((selected: any) => typeof selected !== 'undefined')
                    .map((selected: any) =>
                        this.$data._items.find((item: any) => item.id === selected.id) || selected);
            } else {
                if (typeof this.value !== 'undefined') {
                    this.$data._selected = this._transformItem(this.value);
                }
            }
        },

        /**
         * Override this function if the item should be transformed.
         */
        transformItem(item: any): any
        {
            return item;
        }
    },

    created()
    {
        this.transformItem = this.transformation;

        this.$watch('items', () => {
            this.transformItems();
        }, { immediate: true });

        this.$watch('selected', () => {
            this.transformItems();
            this.initSelected();
        }, { immediate: true });
    }
}

</script>
