<template>
    <form-main v-bind="getProps()" v-on="getOn()" :submit="reset" :submit-text="$t('common.reset')">
        <v-flex xs12>
            <p>{{ $t('form.passwordAskReset.message') }}</p>
            <v-text-field :label="$t('form.email')" v-model="model.email" name="email">
            </v-text-field>
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
                        .then(response =>
                        {
                            this.success = true;
                            resolve(response);
                        })
                        .catch(response => reject(response));
                })
            }
        }
    }

</script>
