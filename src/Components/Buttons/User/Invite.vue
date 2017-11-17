<template>
    <v-tooltip top>
        <button-submit :text="buttonText" :on-click="invite()" :disabled="buttonDisabled" icon
                       slot="activator">
            <v-icon>send</v-icon>
        </button-submit>
    </v-tooltip>
</template>

<script>

    export default
    {
        selector: 'button-user-invite',

        props: {

            /**
             * The user that will be invited.
             */
            user: {
                type: Object,
                required: true
            }
        },

        data()
        {
            return {

                /**
                 * Text that will be displayed on the button.
                 */
                buttonText: 'Invite',

                /**
                 * Whether the button is disabled or not.
                 */
                buttonDisabled: false,
            }
        },

        methods: {

            /**
             * Invite the specified agent to join the platform.
             */
            invite()
            {
                return (resolve, reject) =>
                {
                    this.$api.users.invite(this.user)
                        .then(response =>
                        {
                            this.$eh.$emit('SnackbarDisplayMessage', {
                                message: 'Invitation pending...'
                            });

                            resolve();
                        })
                        .catch((error) => reject(error));
                }
            }
        }
    }

</script>
