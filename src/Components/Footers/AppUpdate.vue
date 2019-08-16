<template>
    <v-footer app class="pa-0 elevation-2" id="footerAppUpdate">
        <v-banner single-line sticky>
            <template #default>App ready to be updated.</template>
            <template #actions>
                <v-btn text color="primary" @click="update">Update</v-btn>
                <v-btn text @click="dismiss">Dismiss</v-btn>
            </template>
        </v-banner>
    </v-footer>
</template>

<style lang="sass">

    #footerAppUpdate
        z-index: 4

</style>

<script lang="ts">

    import { Vue, Component } from 'vue-property-decorator';

    @Component
    export class FooterAppUpdate extends Vue
    {
        /**
         * Update the app.
         */
        update(): void
        {
            location.reload();
        }

        /**
         * Dismiss the footer.
         */
        dismiss(): void
        {
            this.$store.commit('app/SET', {
                key: 'updateAvailable',
                value: false
            });
        }
    }

    export default FooterAppUpdate;

</script>
