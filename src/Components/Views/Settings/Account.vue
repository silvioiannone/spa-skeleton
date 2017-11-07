<template>
    <v-container>
        <v-layout wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title>Your profile</v-card-title>
                    <form-user-profile></form-user-profile>
                </v-card>
            </v-flex>
            <v-flex xs12 class="mt-4">
                <v-card>
                    <v-card-title>Change password</v-card-title>
                    <form-user-change-password></form-user-change-password>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

    import FormUserChangePassword from '../../Forms/User/ChangePassword.vue';
    import FormUserProfile        from '../../Forms/User/Profile.vue';

    export default {

        components: {
            FormUserChangePassword,
            FormUserProfile
        }
    }

</script>
