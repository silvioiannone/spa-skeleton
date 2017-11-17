<template>
    <form @submit.prevent>
        <v-container grid-list-lg fluid>
            <v-layout row class="mt-3">
                <v-flex xs12 sm6>
                    <v-text-field label="First name" v-model="firstName"
                                  data-vv-name="firstName" v-validate="'required'"
                                  :error-messages="errors.collect('firstName')">
                    </v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-text-field label="Last name" v-model="lastName"
                                  data-vv-name="lastName" v-validate="'required'"
                                  :error-messages="errors.collect('lastName')">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12>
                    <button-submit :on-click="updateUser" color="primary" :disabled="errors.any()">
                        Update profile
                    </button-submit>
                </v-flex>
            </v-layout>
        </v-container>
    </form>
</template>

<script>

    export default
    {
        name: 'FormUserProfile',

        data()
        {
            return {
                firstName: '',
                lastName: '',
            }
        },

        computed: {

            user()
            {
                return this.$store.getters.app.user;
            }
        },

        methods: {

            /**
             * Update the user.
             */
            updateUser(resolve, reject)
            {
                this.$store.dispatch('user/UPDATE', {
                    id: this.user.id,
                    first_name: this.firstName,
                    last_name: this.lastName
                })
                    .then(() => resolve())
                    .catch(() => reject());
            }
        },

        mounted()
        {
            this.firstName = this.user.first_name;
            this.lastName = this.user.last_name;
        }
    }

</script>
