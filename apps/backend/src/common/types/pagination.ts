export interface PaginationQuery {
  page: number;
  limit: number;
  order: "asc" | "desc";
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
