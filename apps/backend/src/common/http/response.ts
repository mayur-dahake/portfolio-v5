import type { PaginatedMeta } from "../types/pagination";

export const paginatedResponse = <T>(data: T[], meta: PaginatedMeta) => ({
  data,
  meta
});
