<template>
    <vue-draggable v-model="model" @change="moveItem" v-bind="options" :handle="handle"
                   :class="[_class]">
        <slot/>
    </vue-draggable>
</template>

<script lang="ts">

    import _                        from 'lodash';
    import { Component, Prop, Vue } from 'vue-property-decorator';
    import VueDraggable             from 'vuedraggable';

    /**
     * This component allows you to sort the contained elements.
     *
     * It operates in two modes:
     *
     * - "index" mode: the items are sorted using their indexes in the `value` array. In simpler
     *                 words: the items in the `value` prop are re-ordered by changing their
     *                 position and no changes is made to the item's data.
     * - "key" mode: the elements are sorted using a property on each item. This property (defaults
     *               to `position`) is updated in order to keep track of item's position.
     */
    @Component({
        components: {
            VueDraggable
        }
    })
    export class Draggable extends Vue
    {
        /**
         * Class that will be used to identify the handle.
         */
        @Prop({ type: String, default: '' }) handle: Array<any>;

        /**
         * Enable the key-based mode.
         */
        @Prop({ type: Boolean, default: false }) keyMode: boolean;

        /**
         * Key that denotes the key holding the position index. It can be a string with dot-sperated
         * keys.
         */
        @Prop({ type: String, default: 'position' }) positionKey: string;

        /**
         * The items that will be ordered.
         */
        @Prop({ type: Array, default: () => [] }) value: Array<any>;

        /**
         * Object of options.
         *
         * See: https://github.com/RubaXa/Sortable#options
         */
        @Prop({
            type: Object, default: () => {
                scrollSensitivity: 120
            }
        }) options: any;

        get _class(): string
        {
            return this.$attrs.class || 'draggable';
        }

        get model(): Array<any>
        {
            return this.value;
        }

        set model(value: Array<any>)
        {
            if (this.keyMode) {
                return;
            }

            this.$emit('input', value);
        }

        /**
         * Move the item to the new position.
         *
         * @param movement
         */
        moveItem(movement: any): void
        {
            if (! this.keyMode) {
                return;
            }

            movement         = movement.moved;
            let item         = movement.element;
            let oldPosition  = this.getPosition(item);

            // Get the position of the nearest item. The nearest item is the previous item if
            // moving the items down or the next item if moving them down.
            let nearestItem = this.model[movement.newIndex];

            // Give the current item the same position as the reference item (the backend will
            // take care of updating the other item's position to the correct value).
            this.setPosition(item, this.getPosition(nearestItem));

            // Update the item.
            this.$emit('change', item);

            // Update the other items position by replicating the changes that are made
            // server-side.
            // If the item was moved down...
            if (this.getPosition(item) >= oldPosition) {
                // Get all the previous items and decrease their position by one.
                this.model
                    .filter((currentItem: any): boolean => {
                        return (this.getPosition(currentItem) > oldPosition)
                            && (this.getPosition(currentItem) <= this.getPosition(item))
                            && (currentItem.id !== item.id);
                    })
                    .forEach((currentItem: any): void => {
                        this.setPosition(currentItem, this.getPosition(currentItem) - 1);
                    });
            } else {
                // Get all the following items and increase their position by one.
                this.model
                    .filter((currentItem: any): boolean => {
                        return (this.getPosition(currentItem) >= this.getPosition(item))
                            && (this.getPosition(currentItem) < oldPosition)
                            && (currentItem.id !== item.id);
                    })
                    .forEach((currentItem: any): void => {
                        this.setPosition(currentItem, this.getPosition(currentItem) + 1);
                    });
            }

            this.$emit('input', this.model);
        }

        /**
         * Get the position of an item.
         */
        getPosition(item: any): number
        {
            return _.get(item, this.positionKey);
        }

        /**
         * Set the position of an item.
         */
        setPosition(item: any, position: number)
        {
            return _.set(item, this.positionKey, position);
        }
    }

    export default Draggable;

</script>
