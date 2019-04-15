<template>
    <dialog-main v-model="model">
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

    export {

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

            /**
             * Control the dialog's visibility.
             */
            value: {
                type: Boolean,
                default: false
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
             * Calls the confirmation action.
             */
            callConfirm(resolve, reject)
            {
                this.confirm()
                    .then(() => resolve())
                    .catch(error => reject(error));
            }
        }
    }

</script>
