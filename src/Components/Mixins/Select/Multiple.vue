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

        name: 'SelectMultiple',

        props: {

            /**
             * Models that will be available in the select box.
             */
            models: {
                type: Array,
                required: true
            },

            /**
             * Already selected subjects.
             */
            selected: {
                type: Array,
                default: () => []
            },

            /**
             * Selectbox label.
             */
            label: {
                type: String,
                default: 'Users'
            }
        },

        data()
        {
            return {
                _selected: [],
                _models: []
            }
        },

        methods: {

            /**
             * Fire the needed event.
             */
            fire(models)
            {
                let completeModels = this.models
                    .filter(model => models.indexOf(model.id) !== -1);
                this.$emit('selected', completeModels);
            },

            /**
             * Transform a model so that it can be used by the select box.
             */
            _transformModel(model)
            {
                if (typeof this.transformModel !== 'undefined') {
                    let localModel = JSON.parse(JSON.stringify(model));
                    return this.transformModel(localModel)
                }

                return model;
            }
        },

        mounted()
        {
            this.$data._selected = this.selected.map(model => this._transformModel(model));
            this.$data._models = this.models.map(model => this._transformModel(model));
        }
    }

</script>
