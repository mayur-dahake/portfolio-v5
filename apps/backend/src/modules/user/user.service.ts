import type { Prisma } from "@prisma/client";

import { HttpStatus } from "../../common/constants/http";
import { ApiError } from "../../common/errors/api-error";
import { paginatedResponse } from "../../common/http/response";
import {
  makePaginationMeta,
  parsePaginationQuery
} from "../../common/utils/query";
import { prisma } from "../../config/prisma";

export const userService = {
  async create(payload: Prisma.UserCreateInput) {
    return prisma.user.create({ data: payload });
  },

  async findAll(rawQuery: Record<string, unknown>) {
    const { page, limit, order } = parsePaginationQuery(rawQuery);
    const where: Prisma.UserWhereInput = {};

    if (rawQuery.email) {
      where.email = { contains: rawQuery.email as string, mode: "insensitive" };
    }
    if (rawQuery.role) {
      where.role = { equals: rawQuery.role as string };
    }

    const [total, data] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        orderBy: { order },
        skip: (page - 1) * limit,
        take: limit
      })
    ]);

    return paginatedResponse(data, makePaginationMeta(page, limit, total));
  },

  async findById(id: string) {
    const entity = await prisma.user.findUnique({ where: { id } });
    if (!entity) {
      throw new ApiError(HttpStatus.NOT_FOUND, "User not found");
    }
    return entity;
  },

  async update(id: string, payload: Prisma.UserUpdateInput) {
    await this.findById(id);
    return prisma.user.update({ where: { id }, data: payload });
  },

  async remove(id: string) {
    await this.findById(id);
    await prisma.user.delete({ where: { id } });
  }
};
