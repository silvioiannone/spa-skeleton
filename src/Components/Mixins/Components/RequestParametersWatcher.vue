<script lang="ts">

    import Vue               from 'vue';
    import { Component }     from 'vue-property-decorator';
    import ResponseInterface from '../../../Library/Api/ResponseInterface';

    /**
     * This mixin is used in order to specify a list of parameters and, after one of the parameters
     * changes, the defined callback will be executed.
     */
    @Component
    export default class RequestParametersWatcher extends Vue
    {
        parameters: any = {};

        afterResponseCallbacks: Array<Function> = [];

        /**
         * Set the initial request parameters value.
         *
         * If this is called multiple times the parameters will be merged with the existing ones.
         */
        setParameters(parameters: object): void
        {
            let oldParameters = this.getParameters();
            let newParameters = {
                ...this.parameters,
                ...parameters
            };

            if (JSON.stringify(oldParameters) === JSON.stringify(newParameters)) {
                return;
            }

            this.parameters = newParameters;
        }

        /**
         * Get the request parameters.
         */
        getParameters(): any
        {
            return {...this.parameters};
        }

        /**
         * Callback executed when the request parameters change.
         *
         * Override this function!
         */
        onRequestParametersChange(parameters: any): Promise<ResponseInterface>
        {
            return <Promise<ResponseInterface>><unknown>false;
        }

        /**
         * Clean the request parameters by removing null or undefined values;
         */
        cleanParameters(parameters: any): any
        {
            let cleanParameters = {};

            for (let key in parameters) {
                if (parameters[key] === null || parameters[key] === undefined) {
                    continue;
                }

                cleanParameters[key] = parameters[key];
            }

            return cleanParameters;
        }

        /**
         * Register a callback that will receive the response.
         */
        afterResponse(callback: (response: ResponseInterface) => void)
        {
            this.afterResponseCallbacks.push(callback);
        }

        /**
         * Request the data from the server.
         */
        async requestData(): Promise<ResponseInterface>
        {
            let response = await this.onRequestParametersChange(
                this.cleanParameters(this.getParameters())
            );

            this.afterResponseCallbacks.forEach(callback => callback(response));

            return response;
        }

        mounted()
        {
            // We need to define the watcher inside the `created` hook in order to avoid it from
            // being triggered multiple times. If the watcher is defined using `@Watch` then the
            // default Vue mixin merge strategies will register a watcher for every usage of this
            // mixin causing it to be called multiple times.
            // Since this will only be called once then we don't even need to compare the new
            // parameters with the old ones in order to determine if something changed.
            this.$watch('parameters', async () => this.requestData());
        }
    }

</script>
