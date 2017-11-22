/**
 * This filter formats a company organization number.
 */
export default function (value)
{
    if (! value) return '';

    return value.slice(0, 6) + '-' + value.slice(6, value.length);
}
