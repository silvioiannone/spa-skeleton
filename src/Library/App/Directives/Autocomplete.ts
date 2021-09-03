/**
 * The purpose of this directive is to toggle the autocomplete of an `input` element.
 *
 * Usage: `v-autocomplete="off"` disable the autocomplete.
 */
export default {

    /**
     * Inserted hook.
     */
    inserted: function(el: HTMLElement, binding: { value: boolean }): void
    {
        /**
         * Toggle the autocomplete attribute.
         */
        function toggleAutocomplete(element: HTMLElement, value: boolean): void
        {
            if (value) {
                return;
            }

            if (navigator.userAgent.indexOf("Chrome") !== -1) {
                element.setAttribute('autocomplete', 'chrome-off');
            } else {
                element.setAttribute('autocomplete', 'off');
            }
        }

        if (el.tagName === 'input') {
            toggleAutocomplete(el, binding.value);
            return;
        }

        let input = el.querySelectorAll('input').forEach((element: HTMLInputElement) => {
            toggleAutocomplete(element, binding.value);
        });
    }
}
