import { makePaginationMeta, parsePaginationQuery } from "../src/common/utils/query";

describe("query utils", () => {
  it("parses pagination defaults", () => {
    const parsed = parsePaginationQuery({});
    expect(parsed).toEqual({ page: 1, limit: 10, order: "asc" });
  });

  it("parses pagination values from query params", () => {
    const parsed = parsePaginationQuery({
      page: "2",
      limit: "25",
      order: "desc"
    });
    expect(parsed).toEqual({ page: 2, limit: 25, order: "desc" });
  });

  it("builds pagination meta", () => {
    const meta = makePaginationMeta(2, 10, 42);
    expect(meta).toEqual({ page: 2, limit: 10, total: 42, totalPages: 5 });
  });
});
