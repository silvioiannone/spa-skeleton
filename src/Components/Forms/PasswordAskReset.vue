<template>
    <form-main :submit="reset" submit-text="Reset">
        <v-flex xs12>
            <p>
                Please enter the email address that was used to create your account. We'll send an
                email with a reset link where you can set a new password.
            </p>
            <v-text-field label="E-mail" v-model="model.email"></v-text-field>
        </v-flex>
    </form-main>
</template>

<script>

    import MixinContainerForm from '../Mixins/Containers/Form';

    export default {

        name: 'FormPasswordAskReset',

        mixins: [
            MixinContainerForm
        ],

        props: {

            /**
             * The reset token.
             */
            token: {
                type: String,
                default: ''
            }
        },

        data()
        {
            return {
                model: {
                    email: ''
                },
                success: false
            }
        },

        methods: {

            /**
             * Reset the user password.
             *
             * @param resolve
             * @param reject
             */
            reset(resolve, reject)
            {
                return new Promise((resolve, reject) =>
                {
                    this.$api.users.sendPasswordResetEmail(this.model.email)
                        .then(() =>
                        {
                            this.success = true;
                            resolve();
                        })
                        .catch(() => reject());
                })
            }
        }
    }

</script>
