<template>
    <form @submit.prevent>
        <v-alert error :value="formError">
            Log in failed. Please check your credentials and try again.
        </v-alert>
        <v-container fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-text-field v-model="email" label="Email"></v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <v-text-field v-model="password" label="Password" type="password">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <button-submit :on-click="submit" v-show="email && password" color="primary">
                        Log in
                    </button-submit>
                </v-flex>
            </v-layout>
        </v-container>
    </form>
</template>

<script>

    import BloomEstateAPI from '../../Library/API';

    let api = new BloomEstateAPI();

    export default {

        name : 'FormLogin',

        data()
        {
            return {
                /**
                 * Email address.
                 */
                email : '',

                /**
                 * Password.
                 */
                password : '',

                /**
                 * Whether there was an error submitting the form or not.
                 */
                formError: false
            }
        },

        computed:
            {
                user()
                {
                    return this.$store.getters.app.user;
                }
            },

        mounted()
        {
            if(this.user.email)
            {
                this.email = this.user.email;
            }
        },

        methods :
        {
            test()
            {
                alert();
            },

            /**
             * Submit the login form.
             */
            submit(resolve, reject)
            {
                let self = this;

                this.$store.commit('user/REMOVE_AUTHENTICATED_USER');

                this.$store.dispatch('user/LOGIN', {
                    username : this.email,
                    password : this.password
                })
                    .then(() =>
                    {
                        api.users
                            .setParameters({
                                with: 'role'
                            })
                            .get('me')
                            .then(response =>
                            {
                                self.$router.push('/home');
                            });

                        this.formError = false;
                        resolve();
                    })
                    .catch(error =>
                    {
                        self.formError = true;
                        console.error(error);
                        reject(error);
                    });
            }
        }
    }
</script>
