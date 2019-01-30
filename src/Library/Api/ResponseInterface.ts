import HttpStatusCodes from './HttpStatusCodes';

export default interface ResponseInterface
{
    body: any,
    status: HttpStatusCodes
}
