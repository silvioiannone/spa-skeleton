import { ResponseInterface } from 'spa-skeleton';

/**
 * Response utils.
 */
export class Response
{
    /**
     * Generate a download action from a response.
     */
    public static download(response: ResponseInterface): void
    {
        const url = URL.createObjectURL(response.body);
        const a = document.createElement('a');

        a.style.display = 'none';
        a.href = url;
        a.target = '_blank';

        // Extract the filename from the response headers.
        let nameRegexResult = response.headers['content-disposition']
            .match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?;?/);
        a.download = nameRegexResult[1];

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
