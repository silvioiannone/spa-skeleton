<template>
    <router-link :to="'/users/' + user.id" tag="span" class="clickable">
        <v-avatar :size="size + 'px'" v-if="user.settings.avatar.small !== 'avatar.png'">
            <img :src="'storage/' + user.settings.avatar.small"
                 :alt="user.first_name + ' ' + user.last_name + '\'s avatar'">
        </v-avatar>
        <vue-avatar v-else :username="user.first_name + ' ' + user.last_name" :size="size">
        </vue-avatar>
    </router-link>
</template>

<style>

    .vue-avatar--wrapper {
        display: inline-flex;
        vertical-align: middle;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .chip .vue-avatar--wrapper {
        margin-left: -12px;
        margin-right: 4px;
    }

</style>

<script>

    import VueAvatar from 'vue-avatar';

    export default
    {
        name: 'AvatarUser',

        components: {
            VueAvatar
        },

        props: {

            /**
             * Avatar's size.
             */
            size: {
                type: Number,
                default: 48
            },

            /**
             * User whose avatar will be displayed.
             */
            user: {
                type: Object
            }
        }
    }

</script>
