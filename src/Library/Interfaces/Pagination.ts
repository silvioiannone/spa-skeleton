export interface Pagination
{
    page: number;
    per_page: number;
    total: number;
    last_page: number;
    sort: string | (string | null)[];
}
