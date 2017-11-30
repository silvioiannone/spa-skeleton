<script>

    /**
     * This mixin can be used in order to bootstrap the creation of a select box.
     *
     * If the models that you want to be available in the selectbox do not have a value/text
     * properties you can create a `transformModel` in the component using this mixin that will
     * add those two properties to each model. For example:
     *
     *     transformModel(model)
     *     {
     *         model.text = model.first_name + ' ' + model.last_name;
     *         model.value = model.id;
     *
     *         return model;
     *     }
     */
    export default {

        props: {

            /**
             * Display chips in the selectbox.
             */
            chips: {
                type: Boolean,
                default: false
            },

            /**
             * Whether or not to display a button to clean the selectbox.
             */
            clearable: {
                type: Boolean,
                default: false
            },

            /**
             * Selectbox label.
             */
            label: {
                type: String,
                default: 'Users'
            },

            /**
             * Models that will be available in the selectbox.
             */
            models: {
                type: Array,
                required: true
            },

            /**
             * Already selected subjects.
             *
             * If it is an array then multiple elements will be allowed to be selected.
             */
            selected: {},

            /**
             * Model transformation function.
             */
            transformation: {
                type: Function,
                default: () => {}
            }
        },

        data()
        {
            return {
                _selected: [],
                _models: [],
                value: null
            }
        },

        computed: {

            multiple()
            {
                return Array.isArray(this.selected);
            }
        },

        methods: {

            /**
             * Fire the needed event.
             */
            fire(models)
            {
                if (models === null) {
                    models = { id: null }
                }
                this.$emit('selected', models);
            },

            /**
             * Transform a model so that it can be used by the select box.
             */
            _transformModel(model)
            {
                if (typeof this.transformModel !== 'undefined') {
                    let localModel = JSON.parse(JSON.stringify(model));

                    if (localModel) {
                        return this.transformModel(localModel)
                    }
                }

                return model;
            }
        },

        created()
        {
            this.transformModel = this.transformation;
        },

        mounted()
        {
            if (this.multiple) {
                this.$data._selected = this.selected.map(model => this._transformModel(model));
            } else {
                if (typeof this.selected !== 'undefined') {
                    this.$data._selected = this._transformModel(this.selected);
                }
            }

            this.$data.value = this.$data._selected;
            this.$data._models = this.models.map(model => this._transformModel(model));
        }
    }

</script>
