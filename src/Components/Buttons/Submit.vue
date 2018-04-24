<template>
    <v-btn :loading="status === 'loading'" :disabled="disabled || status === 'loading'"
           :flat="flat" :color="color" :icon="icon"  @click="_onClick()" type="submit">
        <slot></slot>
    </v-btn>
</template>

<script>

    export default
    {
        selector: 'button-submit',

        props: {

            /**
             * If set to true disabled the button.
             */
            disabled: {
                type: Boolean,
                default: false
            },

            /**
             * On click callback action. This function should be a callback executor compatible
             * function.
             */
            onClick: {
                type: Function
            },

            /**
             * Button states.
             */
            color: String,
            icon: Boolean,

            /**
             * If the button should be flat.
             */
            flat: Boolean
        },

        data()
        {
            return {

                /**
                 * The button status. Accepted values are 'ready' and 'loading'.
                 */
                status: 'ready'
            }
        },

        methods:
        {
            _onClick()
            {
                let self = this;

                this.status = 'loading';

                this.onClick()
                    .then(() =>
                    {
                        self.status = 'ready';
                    })
                    .catch(() =>
                    {
                        self.status = 'ready';
                    });
            }
        }
    }

</script>
