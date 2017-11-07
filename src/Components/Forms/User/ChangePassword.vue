<template>
    <form @submit.prevent>
        <v-container grid-list-lg fluid>
            <v-layout row>
                <v-flex xs12>
                    <v-text-field label="Current password" v-model="currentPassword" type="password"
                                  :error-messages="errors.collect('currentPassword')"
                                  v-validate="'required'" data-vv-name="currentPassword">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex sm6 xs12>
                    <v-text-field label="New password" v-model="password" type="password"
                                  :error-messages="errors.collect('password')"
                                  v-validate="'required'" data-vv-name="password">
                    </v-text-field>
                </v-flex>
                <v-flex sm6 xs12>
                    <v-text-field label="Repeat password" v-model="passwordConfirmation"
                                  type="password" v-validate="'required|matchingPasswords:password'"
                                  :error-messages="errors.collect('passwordConfirmation')"
                                  data-vv-name="passwordConfirmation">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <button-submit color="primary" :on-click="updatePassword"
                                   :disabled="!formIsValid">
                        Change password
                    </button-submit>
                </v-flex>
            </v-layout>
        </v-container>
    </form>
</template>

<script>

    export default
    {
        name: 'FormUserChangePassword',

        data()
        {
            return {
                currentPassword: '',
                password: '',
                passwordConfirmation: ''
            }
        },

        computed: {

            formIsValid()
            {
                return this.password === this.passwordConfirmation
                    && this.password.length && !this.errors.any();
            },

            user()
            {
                return this.$store.getters.app.user;
            }
        },

        methods: {

            /**
             * Update the user password.
             *
             * @param resolve
             * @param reject
             */
            updatePassword(resolve, reject)
            {
                let user = {
                    id: this.user.id,
                    password: this.password
                };

                this.$store.dispatch('user/UPDATE', user)
                    .then(response => resolve())
                    .catch(error => reject());
            }
        },

        created()
        {
            let self = this;

            this.$validator.extend('matchingPasswords', {

                getMessage(field, params, data)
                {
                    return 'The passwords must match.'
                },
                validate(value, params)
                {
                    return self[params[0]] === value;
                }
            });
        }
    }

</script>