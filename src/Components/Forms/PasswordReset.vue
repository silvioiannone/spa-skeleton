<template>
    <form-main v-bind="getProps()" v-on="getOn()" :submit="change" submit-text="Change">
        <v-flex xs12>
            <v-text-field label="New password" type="password" v-model="model.password">
            </v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field label="Repeat password" type="password"
                          v-model="model.password_confirmation">
            </v-text-field>
        </v-flex>
    </form-main>
</template>

<script>

    import FormMain from "spa-skeleton/src/Components/Forms/Main";
    import Wrapper from 'spa-skeleton/src/Components/Mixins/Wrapper';

    export default {

        name: 'FormPasswordReset',

        mixins: [
            Wrapper
        ],

        props: {

            /**
             * User email.
             */
            email: {
                type: String,
                required: true
            },

            /**
             * Password reset token.
             */
            token: {
                type: String,
                required: true
            }
        },

        data()
        {
            return {
                __component: FormMain,
                model: {
                    password: '',
                    passwordConfirmation: ''
                }
            }
        },

        methods: {

            /**
             * Change the password.
             */
            change()
            {
                return new Promise((resolve, reject) =>
                {
                    this.$api.users.resetPassword({
                        token: this.token,
                        password: this.model.password,
                        password_confirmation: this.model.password_confirmation,
                        email: this.email
                    })
                        .then(() => resolve())
                        .catch(() => reject())
                });
            }
        }
    }

</script>
