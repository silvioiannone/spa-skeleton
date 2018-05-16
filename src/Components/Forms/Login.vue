<template>
    <form-main :submit="login" submit-text="login">
        <v-flex xs12>
            <v-text-field label="E-mail" v-model="model.username"></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field label="Password" type="password" v-model="model.password"></v-text-field>
        </v-flex>
    </form-main>
</template>

<script>

    import MixinContainerForm from 'spa-skeleton/src/Components/Mixins/Containers/Form';

    export default {

        name: 'FormLogin',

        mixins: [
            MixinContainerForm
        ],

        data()
        {
            return {
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
