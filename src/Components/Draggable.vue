<template>
    <vue-draggable v-model="model" @change="moveItem" :options="options" class="handle">
        <slot></slot>
    </vue-draggable>
</template>

<script>

    import VueDraggable from 'vuedraggable';

    export default {

        name: 'Draggable',

        components: {
            VueDraggable
        },

        props: {

            /**
             * The items that will be ordered.
             */
            value: {
                type: Array,
                default: () => []
            },

            /**
             * Object of options.
             *
             * See: https://github.com/RubaXa/Sortable#options
             */
            options: {
                type: Object,
                default: () => { return {}; }
            }
        },

        computed: {

            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        },

        methods: {

            /**
             * Move the item to the new position.
             *
             * @param movement
             */
            moveItem(movement)
            {
                movement = movement.moved;
                let item = movement.element;
                let oldPosition = item.position;

                // Get the position of the nearest item. The nearest item is the previous item if
                // moving the items down or the next item if moving them down.
                let nearestItem = movement.newIndex > movement.oldIndex ?
                    this.model[movement.newIndex - 1] :
                    this.model[movement.newIndex + 1];

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
                        .filter(_item => {
                            return (_item.position >= oldPosition)
                                && (_item.position <= item.position)
                                && (_item.id !== item.id);
                        })
                        .map(_item => _item.position--);
                } else {
                    // Get all the following items and increase their position by one.
                    this.model
                        .filter(_item => {
                            return (_item.position >= item.position)
                                && (_item.position <= oldPosition)
                                && (_item.id !== item.id);
                        })
                        .map(_item => _item.position++);
                }
            }
        }
    }

</script>
