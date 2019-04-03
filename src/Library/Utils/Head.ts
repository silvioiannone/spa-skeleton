/**
 * Utility for setting the content of the HTML head tag (such as title, tags and so on...).
 */
export default class Head
{
    /**
     * Set the window's title.
     */
    static title(title: string): void
    {
        document.title = title;
    }
}
