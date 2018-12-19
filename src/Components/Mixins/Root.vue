<script lang="ts">

    import Vue       from 'vue';
    import Component from 'vue-class-component';
    import Config from '../../Config';

    /**
     * This mixin adds multilanguage support to every component.
     */
    @Component
    export default class Root extends Vue
    {
        get userLanguage()
        {
            if(!this.$store.getters.app.user.settings)
            {
                return Config.locale;
            }

            return this.$store.getters.app.user.settings.language;
        }
    }

    //export default
    //{
    //    computed: {
    //
    //        userLanguage()
    //        {
    //
    //        }
    //    },
    //
    //    watch: {
    //
    //        userLanguage()
    //        {
    //            // Request a new locale file from the server...
    //            this.$api.app
    //                .getLocale(this.userLanguage)
    //                .then(response =>
    //                {
    //                    // ... and then switch the locale.
    //                    this.$i18n.setLocaleMessage(this.userLanguage, response.body);
    //                    this.$i18n.locale = this.userLanguage;
    //                });
    //        }
    //    }
    //}

</script>
