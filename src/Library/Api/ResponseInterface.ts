import HttpStatusCodes from './HttpStatusCodes';

interface Request
{
    url: string
}

export default interface ResponseInterface
{
    body: any,
    status: HttpStatusCodes,
    request: Request
}
