import HttpStatusCodes from './HttpStatusCodes';

interface Request
{
    url: string;
}

/**
 * Interface describing how an API response should look like.
 */
export default interface ResponseInterface
{
    body: any;
    headers: {
        (key: string): string;
    };
    status: HttpStatusCodes;
    request: Request;
}
