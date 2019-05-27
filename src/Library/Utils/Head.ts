/**
 * Utility for setting the content of the HTML head tag (such as title, tags and so on...).
 */
export class Head
{
    /**
     * Set the window's title.
     */
    public static title(title: string): void
    {
        document.title = title;
    }

    /**
     * Set the meta description.
     */
    public static description(description: string): void
    {
        let element = document.querySelector('meta[name="Description"]');

        function setMetaTagDescription(element: Element)
        {
            element.setAttribute('name', 'Description');
            element.setAttribute('content', description);
        }

        if (! element) {
            element = document.createElement('meta');
            document.head.appendChild(element);
            setMetaTagDescription(element);
            return;
        }

        setMetaTagDescription(element);
    }
}
