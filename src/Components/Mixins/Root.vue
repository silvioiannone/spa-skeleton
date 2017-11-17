<script>

    /**
     * This mixin adds multilanguage support to every component.
     */

    import Config  from '../../Config';
    import VueI18N from 'vue-i18n';

    export default
    {
        name: 'LayoutRoot',

        computed: {

            userLanguage()
            {
                if(!this.$store.getters.app.user.settings)
                {
                    return Config.locale;
                }

                return this.$store.getters.app.user.settings.language;
            }
        },

        watch: {

            userLanguage()
            {
                // Request a new locale file from the server...
                this.$api.app
                    .getLocale(this.userLanguage)
                    .then(response =>
                    {
                        // ... and then switch the locale.
                        this.$i18n.setLocaleMessage(this.userLanguage, response.body);
                        this.$i18n.locale = this.userLanguage;
                    });
            }
        }
    }

</script>
