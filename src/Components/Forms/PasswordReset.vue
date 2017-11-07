<template>
    <form @submit.prevent>
        <v-layout wrap v-if="!token">
            <v-flex xs12>
                <v-alert success :value="passwordResetSuccessful">
                    Reset email sent.
                </v-alert>
                <p>
                    Please enter the email address that was used to create your account. We'll send
                    an email with a reset link where you can set a new password.
                </p>
                <v-text-field label="E-mail" v-model="email"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <button-submit color="primary" :on-click="resetPassword">Reset</button-submit>
            </v-flex>
        </v-layout>
        <v-layout wrap v-else>
            <v-flex xs12>
                <v-alert success :value="passwordChangeSuccessful">
                    The password has been successfully changed. You can now log in.
                </v-alert>
                <p>Enter a new password</p>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="New password" type="password"
                              v-model="password">
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field label="Repeat password" type="password"
                              v-model="passwordConfirmation">
                </v-text-field>
            </v-flex>
            <v-flex xs12>
                <button-submit color="primary" :on-click="changePassword">Change</button-submit>
            </v-flex>
        </v-layout>
    </form>
</template>

<script>

    import API from '../../Library/API';

    let api = new API;

    export default
    {
        name: 'FormPasswordReset',

        data()
        {
            return {
                email: '',
                password: '',
                passwordConfirmation:  '',
                passwordChangeSuccessful: false,
                passwordResetSuccessful: false
            }
        },

        props: {

            /**
             * The reset token.
             */
            token: {
                type: String,
                default: ''
            }
        },

        methods: {

            /**
             * Change the user password.
             *
             * @param resolve
             * @param reject
             */
            changePassword(resolve, reject)
            {
                api.users.changePassword({
                    token: this.token,
                    password: this.password,
                    password_confirmation: this.passwordConfirmation
                })
                    .then(() =>
                    {
                        this.passwordChangeSuccessful = true;
                        resolve();
                    })
                    .catch(() => reject());
            },

            /**
             * Reset the user password.
             *
             * @param resolve
             * @param reject
             */
            resetPassword(resolve, reject)
            {
                api.users.resetPassword(this.email)
                    .then(() =>
                    {
                        this.passwordResetSuccessful = true;
                        resolve();
                    })
                    .catch(() => reject());
            }
        }
    }

</script>