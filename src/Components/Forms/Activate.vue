<template>
    <form autocomplete="nope" @submit.prevent>
        <v-alert success :value="formSuccess">
            Account activated. You can now <router-link to="/login">log in</router-link>.
        </v-alert>
        <v-container grid-list-lg fluid class="pa-0">
            <v-layout>
                <v-flex xs12>
                    <v-text-field v-model="email" label="Email" type="email"
                                  :error-messages="errors.collect('email')"
                                  v-validate="'required|email'" data-vv-name="email" required>
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs6>
                    <v-text-field v-model="firstName" label="First name" required
                                  :error-messages="errors.collect('firstName')"
                                  v-validate="'required'" data-vv-name="firstName">
                    </v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field v-model="lastName" label="Last name" required
                                  :error-messages="errors.collect('lastName')"
                                  validate="'required'" data-vv-name="lastName">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs6>
                    <v-text-field type="password" v-model="password" label="Password" required
                                  :error-messages="errors.collect('password')"
                                  v-validate="'required'" data-vv-name="password">
                    </v-text-field>
                </v-flex>
                <v-flex xs6>
                    <v-text-field type="password" v-model="passwordConfirmation" required
                                  label="Password Confirmation"
                                  :error-messages="errors.collect('passwordConfirmation')"
                                  v-validate="'required|matchingPasswords:password'"
                                  data-vv-name="passwordConfirmation">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout>
                <v-flex xs12>
                    <div class="text-xs-center">
                        <button-submit :on-click="submit" color="primary"
                                       :disabled="!passwordIsValid || errors.any()">
                            Join
                        </button-submit>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </form>
</template>

<script>

    export default
    {
        selector : 'form-activate',

        props: {

            /**
             * Activation id.
             */
            activationId: {
                type: String
            },

            /**
             * Basic user info.
             */
            user: {
                type: Object
            }
        },

        data()
        {
            return {

                /**
                 * Email address.
                 */
                email : '',

                /**
                 * First name.
                 */
                firstName : '',

                /**
                 * Wheter the form was submitted successfully or not.
                 */
                formSuccess: false,

                /**
                 * Last name.
                 */
                lastName : '',

                /**
                 * Password.
                 */
                password : '',

                /**
                 * Password confirmation.
                 */
                passwordConfirmation : ''
            }
        },

        computed:
        {
            /**
             * Wheter passwords are matching or not.
             */
            passwordIsValid()
            {
                return this.password === this.passwordConfirmation &&
                    (this.password.length || this.passwordConfirmation.length)
            }
        },

        watch:
        {
            user()
            {
                this.email = this.user.email;
                this.firstName = this.user.first_name;
                this.lastName = this.user.last_name;
            }
        },

        methods :
        {
            /**
             * Submit the signup form.
             */
            submit(resolve, reject)
            {
                let self = this;

                this.$api.users.activate({
                    email: this.email,
                    first_name: this.firstName,
                    last_name: this.lastName,
                    password: this.password,
                    activation_id: this.activationId
                })
                    .then(() =>
                    {
                        self.formSuccess = true;
                        resolve();
                    })
                    .catch(error => reject(error));
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
