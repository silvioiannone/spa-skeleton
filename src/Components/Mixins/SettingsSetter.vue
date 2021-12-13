<script lang="ts">

import { ResponseInterface } from '../../Library/Api/ResponseInterface';
import _ from 'lodash';

/**
 * This mixin should be used by all the components that needs to access and set the application
 * settings.
 */
export default {

    computed: {
        settings(): any
        {
            // If the settings.json file contains an empty object, we get an empty array from an API,
            // convert it to an empty Object
            const settings = this.$store.getters.app.settings;

            return Array.isArray(settings) ? {} : settings;
        }
    },

    methods: {
        /**
         * Set an order setting.
         *
         * @param path {String}
         * @param value
         */
        setSetting(path: string, value: any): void
        {
            let settings = { ...this.settings };

            _.set(settings, path, value);

            this.$store.commit('app/SET_SETTINGS', settings);
        },

        /**
         * Save the settings.
         */
        save(): Promise<any>
        {
            return new Promise((resolve: Function, reject: Function) =>
            {
                this.$api.app.saveSettings(this.settings)
                    .then((response: ResponseInterface) =>
                    {
                        this.$store.commit('app/SET_SETTINGS', response.body.data);
                        resolve(response.body.data);
                    })
                    .catch((response: ResponseInterface) => reject(response));
            });
        }
    }
}

</script>
