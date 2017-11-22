/**
 * This directive allows for a callback to be fired when the element it's applied to is clicked.
 */
export default {

    bind: (el, binding) =>
    {
        el.classList.add('clickable');

        el.addEventListener('click', event =>
        {
            binding.value();
        });
    }
}
