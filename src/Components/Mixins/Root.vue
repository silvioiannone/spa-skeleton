<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';
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

        @Watch('userLanguage')
        onUserLanguageChanged()
        {
            // Request a new locale file from the server...
            this.$api.app
                .getLocale(
                    this.userLanguage,
                    (response: any) => {
                        // ... and then switch the locale.
                        this.$i18n.setLocaleMessage(this.userLanguage, response.body);
                        this.$i18n.locale = this.userLanguage;
                    },
                    () => {}
                );
        }
    }

</script>
