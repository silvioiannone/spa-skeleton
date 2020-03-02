<script lang="ts">

    import _                     from 'lodash';
    import { Vue, Component }    from 'vue-property-decorator';
    import { ResponseInterface } from '../../../Library/Api/ResponseInterface';

    /**
     * This mixin is used in order to specify a list of parameters and, after one of the parameters
     * changes, the defined callback will be executed.
     */
    @Component
    export class RequestParametersWatcher extends Vue
    {
        afterResponseCallbacks: Array<Function> = [];

        parameters: any = {};

        previousParameters: any = {};

        /**
         * Set the initial request parameters value.
         *
         * If this is called multiple times the parameters will be merged with the existing ones.
         */
        setParameters(parameters: object): void
        {
            this.previousParameters = this.getParameters();

            this.parameters = parameters;
        }

        /**
         * Merge the parameters with the existing parameters.
         */
        mergeParameters(parameters: object): void
        {
            this.setParameters({...this.getParameters(), ...parameters});
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
            // Use this function in order to retrieve data from the server.
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
        async requestData(): Promise<ResponseInterface | void>
        {
            let response = await this.onRequestParametersChange(
                this.cleanParameters(this.getParameters())
            );

            this.afterResponseCallbacks.forEach(callback => callback(response));

            return response;
        }

        mounted(): void
        {
            // We need to define the watcher inside the `created` hook in order to avoid it from
            // being triggered multiple times. If the watcher is defined using `@Watch` then the
            // default Vue mixin merge strategies will register a watcher for every usage of this
            // mixin causing it to be called multiple times.
            // Since this will only be called once then we don't even need to compare the new
            // parameters with the old ones in order to determine if something changed.
            this.$watch('parameters', (): void => {
                // No need to fetch the data again if the parameters haven't changed.
                if (_.isEqual(this.parameters, this.previousParameters)) {
                    return;
                }

                this.requestData();
            });
        }
    }

    export default RequestParametersWatcher;

</script>
