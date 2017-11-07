<template>
    <div>
        <v-alert success :value="formSuccess">
            Account created. You can now log in.
        </v-alert>
        <form v-if="!formSuccess" @submit.prevent>
            <v-container grid-list-lg fluid>
                <v-layout row>
                    <v-flex xs12>
                        <v-text-field v-model="email" label="Email" type="email"
                                      :error-messages="errors.collect('email')"
                                      v-validate="'required|email'" data-vv-name="email" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-text-field v-model="firstName" label="First name" v-validate="'required'"
                                      :error-messages="errors.collect('firstName')"
                                      data-vv-name="firstName" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field v-model="lastName" label="Last name" v-validate="'required'"
                                      :error-messages="errors.collect('lastName')"
                                      data-vv-name="lastName" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs6>
                        <v-text-field v-model="password" label="Password" type="password"
                                      :error-messages="errors.collect('password')"
                                      v-validate="'required'" data-vv-name="password" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6>
                        <v-text-field v-model="passwordConfirmation" label="Repeat password"
                                      type="password" v-validate="'required|matchingPasswords:password'"
                                      :error-messages="errors.collect('passwordConfirmation')"
                                      data-vv-name="passwordConfirmation" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs12 class="text-xs-center">
                        <button-submit :on-click="submit" color="primary"
                                       v-show="passwordsAreMatching">
                            Sign up
                        </button-submit>
                    </v-flex>
                </v-layout>
            </v-container>
        </form>
    </div>
</template>

<script>

    import API from '../../Library/API';

    /**
     * App API interface.
     */
    let api = new API();

    export default
    {
        name : 'FormSignup',

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
            passwordsAreMatching()
            {
                return this.password === this.passwordConfirmation;
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

                api.users.signup({
                    email: this.email,
                    first_name: this.firstName,
                    last_name: this.lastName,
                    password: this.password
                })
                    .then(response =>
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