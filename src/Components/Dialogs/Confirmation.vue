<template>
    <dialog-main v-model="value">
        <v-card>
            <v-card-title class="headline">{{ title }}</v-card-title>
            <slot></slot>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="$emit('input', false)">Cancel</v-btn>
                <button-submit :on-click="callConfirm" color="error">
                    {{ confirmationText }}
                </button-submit>
            </v-card-actions>
        </v-card>
    </dialog-main>
</template>

<script>

    import DialogMain from './Main.vue';

    export default {

        name: 'DialogConfirmation',

        components: {
            DialogMain
        },

        props: {

            /**
             * A function returning a promise.
             */
            confirm: {
                type: Function,
                required: true
            },

            /**
             * Text that will be displayed in the confirmation button.
             */
            confirmationText: {
                type: String,
                default: 'Confirm'
            },

            /**
             * Modal title.
             */
            title: {
                type: String,
                default: ''
            },

            value: {
                type: Boolean,
                default: false
            }
        },

        methods: {

            /**
             * Calls the confirmation action.
             */
            callConfirm(resolve, reject)
            {
                this.confirm()
                    .then(() => resolve())
                    .catch(error => reject(error));
            }
        },

        watch: {

            value(value)
            {
                this.$emit('input', value);
            }
        }
    }

</script>
