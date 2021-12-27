<script lang="ts">

import { Translator } from '../../Library/Services/Translator';
import { Config } from '../../Config';
import * as VuetifyLocales from 'vuetify/src/locale';
import { Time } from '../../Library/Services/Time';

export default {

    name: 'Root',

    computed: {
        language(): any
        {
            if (this.$user.settings) {
                return this.$user.settings.language;
            }

            return Config.locale;
        }
    },

    watch: {
        async language(): Promise<void>
        {
            // Request a new locale file from the server...
            let messages = (await this.$api.app.getLocale(this.language)).body;

            // ... and then switch the locale.
            // Translator.get().setLocaleMessage(this.language, response.body);
            Translator.merge(messages, '', this.language);
            Translator.merge(VuetifyLocales[this.language], '$vuetify', this.language);
            Translator.get().locale = this.language;

            // Change the Vuetify locale.
            this.$vuetify.lang.current = this.language;

            // Change the time service.
            Time.changeLocale(this.language);
        }
    },

    created(): void
    {
        this.$ws.connect(this);
        this.$ws.subscribe();

        document.documentElement.setAttribute('lang', this.language);
    }
}

</script>
