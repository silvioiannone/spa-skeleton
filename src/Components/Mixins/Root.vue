<script>

    /**
     * This mixin adds multilanguage support to every component.
     */

    import API     from '../../Library/API';
    import Config  from '../../Config';
    import VueI18N from 'vue-i18n';

    let api = new API;

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
                api.app
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
