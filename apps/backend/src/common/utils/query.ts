import type { PaginationQuery } from "../types/pagination";

const toInt = (value: unknown, fallback: number): number => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
};

export const parsePaginationQuery = (
  query: Record<string, unknown>
): PaginationQuery => {
  const orderRaw = String(query.order ?? "asc").toLowerCase();

  return {
    page: toInt(query.page, 1),
    limit: toInt(query.limit, 10),
    order: orderRaw === "desc" ? "desc" : "asc"
  };
};

export const makePaginationMeta = (
  page: number,
  limit: number,
  total: number
): { page: number; limit: number; total: number; totalPages: number } => {
  return {
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit))
  };
};
