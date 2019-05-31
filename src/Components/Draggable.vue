<template>
    <vue-draggable v-model="model" @change="moveItem" v-bind="options" class="handle">
        <slot></slot>
    </vue-draggable>
</template>

<script lang="ts">

    import { Component, Prop, Vue } from 'vue-property-decorator';
    import VueDraggable             from 'vuedraggable';

    @Component({
        components: {
            VueDraggable
        }
    })
    export class Draggable extends Vue
    {
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

        get model(): Array<any>
        {
            return this.value;
        }

        set model(value: Array<any>)
        {
            this.$emit('input', value);
        }

        /**
         * Move the item to the new position.
         *
         * @param movement
         */
        moveItem(movement: any): void
        {
            movement        = movement.moved;
            let item        = movement.element;
            let oldPosition = item.position;

            // Get the position of the nearest item. The nearest item is the previous item if
            // moving the items down or the next item if moving them down.
            let nearestItem = this.model[movement.newIndex];

            // Give the current item the same position as the reference item (the backend will
            // take care of updating the other item's position to the correct value).
            item.position = nearestItem.position;

            // Update the item.
            this.$emit('change', item);

            // Update the other items position by replicating the changes that are made
            // server-side.
            // If the item was moved down...
            if (item.position >= oldPosition) {
                // Get all the previous items and decrease their position by one.
                this.model
                    .filter((_item: any) => {
                        return (_item.position > oldPosition)
                            && (_item.position <= item.position)
                            && (_item.id !== item.id);
                    })
                    .map((_item: any) => _item.position--);
            } else {
                // Get all the following items and increase their position by one.
                this.model
                    .filter((_item: any) => {
                        return (_item.position >= item.position)
                            && (_item.position < oldPosition)
                            && (_item.id !== item.id);
                    })
                    .map((_item: any) => _item.position++);
            }
        }
    }

    export default Draggable;

</script>
