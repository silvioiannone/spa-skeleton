/**
 * This class will display a loader as soon as possible.
 */
export class Loader
{
    /**
     * Show the loader.
     */
    public static show(): void
    {
        window.addEventListener('appLoaded', () =>
        {
            let loader = document.querySelector('.loader__container') as HTMLElement;

            if (loader) {
                loader.style.display = 'none';
            }
        });
    }
}


