<script lang="ts">

    import { Vue, Component, Watch } from 'vue-property-decorator';
    import { Translator }            from '../../Library/Services/Translator';
    import { Config }                from '../../Config';
    import * as VuetifyLocales       from 'vuetify/src/locale';
    import { Time }                  from '../../Library/Services/Time';

    @Component
    export class Root extends Vue
    {
        get language(): any
        {
            if (this.$user.settings) {
                return this.$user.settings.language;
            }

            return Config.locale;
        }

        @Watch('language')
        async onUserLanguageChanged(): Promise<void>
        {
            // Request a new locale file from the server...
            let response = await this.$api.app.getLocale(this.language);

            // ... and then switch the locale.
            // Translator.get().setLocaleMessage(this.language, response.body);
            Translator.merge(response.body, '', this.language);
            Translator.merge(VuetifyLocales[this.language], '$vuetify', this.language);
            Translator.get().locale = this.language;

            // Change the Vuetify locale.
            this.$vuetify.lang.current = this.language;

            // Chamge the time service.
            Time.changeLocale(this.language);
        }

        created(): void
        {
            this.$ws.connect(this);
            this.$ws.subscribe();

            document.documentElement.setAttribute('lang', this.language);
        }
    }

    export default Root;

</script>
