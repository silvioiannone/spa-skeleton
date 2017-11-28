<template>
    <v-avatar :size="size">
        <img :src="'storage/' + user.settings.avatar.small"
             :alt="user.first_name + ' ' + user.last_name + '\'s avatar'">
    </v-avatar>
</template>

<script>

    export default
    {
        name: 'AvatarUser',

        props: {

            size: {
                type: String,
                default: '48px'
            },

            user: {
                type: Object
            }
        }
    }

</script>
