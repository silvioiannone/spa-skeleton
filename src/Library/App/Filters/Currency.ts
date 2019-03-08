import AbstractFilter from './AbstractFilter';

/**
 * Currency filter.
 *
 * @param value
 */
export default class Currency extends AbstractFilter
{
    /**
     * Run the filter.
     */
    run(): (value: string) => string
    {
        return (value: string) =>
        {
            let settings = this.store.getters.app.user.settings;

            return new Intl.NumberFormat(settings.language, {
                style: 'decimal',
                currency: 'SEK',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
            }).format(parseInt(value));
        }
    }
}
