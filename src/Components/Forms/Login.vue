<template>
    <form-main v-bind="getProps()" v-on="getOn()" :submit="login" submit-text="login">
        <v-flex xs12>
            <v-text-field label="E-mail" v-model="model.username"></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field label="Password" type="password" v-model="model.password"></v-text-field>
        </v-flex>
    </form-main>
</template>

<script>

    import FormMain from "spa-skeleton/src/Components/Forms/Main";
    import Wrapper  from 'spa-skeleton/src/Components/Mixins/Wrapper';

    export default {

        name: 'FormLogin',

        mixins: [
            Wrapper
        ],

        data()
        {
            return {
                __component: FormMain,
                model: {
                    username: '',
                    password: ''
                }
            }
        },

        methods: {

            /**
             * Authenticate the user.
             */
            login()
            {
                return new Promise((resolve, reject) =>
                {
                    this.$api.users.login(this.model)
                        .then(response => resolve(response))
                        .catch(response => reject(response));
                });
            }
        }
    }

</script>
