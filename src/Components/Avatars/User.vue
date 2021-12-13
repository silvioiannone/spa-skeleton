<template>
    <div>
        <v-avatar v-if="userHasCustomAvatar" :size="size + 'px'">
            <img :src="`storage/${user.settings.avatar.small}`"
                 :alt="user.first_name + ' ' + user.last_name + '\'s avatar'">
        </v-avatar>
        <vue-avatar v-else :username="user.first_name + ' ' + user.last_name" :size="size"/>
    </div>
</template>

<script lang="ts">

import VueAvatar from 'vue-avatar';

export default {

    name: 'AvatarUser',

    components: {
        VueAvatar
    },

    props: {
        /**
         * Avatar's size.
         */
        size: { type: Number, default: 48 },

        /**
         * User whose avatar will be displayed.
         */
        user: { type: Object, required: true }
    },

    computed: {
        userHasCustomAvatar(): boolean
        {
            return !! this.user.settings?.avatar?.small;
        }
    }
}

</script>
