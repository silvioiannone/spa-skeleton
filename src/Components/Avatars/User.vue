<template>
    <router-link :to="_to" tag="span" class="clickable">
        <v-avatar :size="size + 'px'"
                  v-if="user.settings && user.settings.avatar.small !== 'avatar.png'">
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

<script lang="ts">

    import VueAvatar           from 'vue-avatar';
    import Vue                 from 'vue';
    import { Component, Prop } from 'vue-property-decorator';

    @Component({
        components: {
            VueAvatar
        }
    })
    export class AvatarUser extends Vue
    {
        /**
         * Avatar's size.
         */
        @Prop({ type: Number, default: 48 }) size: number;

        /**
         * User whose avatar will be displayed.
         */
        @Prop({ type: Object, required: true }) user: any;

        /**
         * Link of the router.
         */
        @Prop({ type: String, default: '' }) to: string;

        get _to()
        {
            return this.to.length ? this.to : '/users/' + this.user.id;
        }
    }

    export default AvatarUser;

</script>
