<script>

    /*
     * This mixin should be used by all the components that needs to access and set the application
     * settings.
     */

    import _ from 'lodash';

    export {

        name: 'SettingsSetter',

        computed: {

            settings()
            {
                return this.$store.getters.app.settings;
            }
        },

        methods: {

            /**
             * Set an order setting.
             *
             * @param path {String}
             * @param value
             */
            setSetting(path, value)
            {
                let settings = { ...this.settings };

                _.set(settings, path, value);

                this.$store.commit('app/SET_SETTINGS', settings);
            },

            /**
             * Save the settings.
             */
            save()
            {
                return new Promise((resolve, reject) =>
                {
                    this.$api.app.saveSettings(this.settings)
                        .then(response =>
                        {
                            this.$store.commit('app/SET_SETTINGS', response.body.data);
                            resolve();
                        })
                        .catch(response => reject());
                });
            }
        }
    }

</script>
