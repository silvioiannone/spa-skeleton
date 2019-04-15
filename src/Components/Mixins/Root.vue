<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { Config }                from '../../Config';

    /**
     * This mixin adds multilanguage support to every component.
     */
    @Component
    export class Root extends Vue
    {
        get userLanguage(): any
        {
            if(!this.$store.getters.app.user.settings)
            {
                return Config.locale;
            }

            return this.$store.getters.app.user.settings.language;
        }

        @Watch('userLanguage')
        async onUserLanguageChanged(): Promise<void>
        {
            // Request a new locale file from the server...
            let response = await this.$api.app.getLocale(this.userLanguage);

            // ... and then switch the locale.
            this.$i18n.setLocaleMessage(this.userLanguage, response.body);
            this.$i18n.locale = this.userLanguage;
        }
    }

    export default Root;

</script>
