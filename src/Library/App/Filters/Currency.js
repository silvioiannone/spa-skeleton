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
     *
     * @param value
     */
    run(value)
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
