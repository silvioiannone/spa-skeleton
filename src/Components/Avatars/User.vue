<template>
    <div>
        <v-avatar v-if="userHasCustomAvatar"
                  :size="size + 'px'">
            <img :src="`storage/${user.settings.avatar.small}`"
                 :alt="user.first_name + ' ' + user.last_name + '\'s avatar'">
        </v-avatar>
        <vue-avatar v-else :username="user.first_name + ' ' + user.last_name" :size="size"/>
    </div>
</template>

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

        get userHasCustomAvatar(): boolean
        {
            return !! this.user.settings?.avatar?.small;
        }
    }

    export default AvatarUser;

</script>
