export interface Pagination
{
    page: number;
    rowsPerPage: number;
    totalItems: number;
    totalPages: number;
    sortBy: string | (string | null)[];
    descending: boolean | null;
}
