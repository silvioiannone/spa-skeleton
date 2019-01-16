export default interface Pagination
{
    page: number;
    rowsPerPage: number;
    totalItems: number;
    totalPages: number;
    sortBy: string | string[];
    descending: boolean | null;
}
