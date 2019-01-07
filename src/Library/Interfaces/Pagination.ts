export default interface Pagination
{
    page: string | string[];
    rowsPerPage: string;
    totalItems: string;
    totalPages: string;
    sortBy: string | string[];
    descending: boolean | null;
}
