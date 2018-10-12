<template>
    <form-main v-bind="getProps()" v-on="getOn()" :submit="reset" submit-text="Reset">
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

    import FormMain from "spa-skeleton/src/Components/Forms/Main";
    import Wrapper  from 'spa-skeleton/src/Components/Mixins/Wrapper';

    export default {

        name: 'FormPasswordAskReset',

        mixins: [
            Wrapper
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
                __component: FormMain,
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
