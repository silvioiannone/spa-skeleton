/**
 * This filter formats a phone number.
 */
export default function (value)
{
    if (! value) return '';

    return value.slice(0, 3) + ' ' + value.slice(3, 5) + ' ' + value.slice(5, 8) +  ' ' + value.slice(8, value.length);
}
