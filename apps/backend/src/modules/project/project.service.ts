import type { Prisma } from "@prisma/client";

import { ApiError } from "../../common/errors/api-error";
import { paginatedResponse } from "../../common/http/response";
import { HttpStatus } from "../../common/constants/http";
import {
  makePaginationMeta,
  parsePaginationQuery
} from "../../common/utils/query";
import { prisma } from "../../config/prisma";

export const projectService = {
  async create(payload: Prisma.ProjectCreateInput) {
    return prisma.project.create({ data: payload });
  },

  async findAll(rawQuery: Record<string, unknown>) {
    const { page, limit, order } = parsePaginationQuery(rawQuery);
    const where: Prisma.ProjectWhereInput = {};

    if (rawQuery.title) {
      where.title = { contains: rawQuery.title as string, mode: "insensitive" };
    }
    if (rawQuery.tag) {
      where.tags = { has: rawQuery.tag as string };
    }
    if (rawQuery.tech) {
      where.techStack = { has: rawQuery.tech as string };
    }

    const [total, data] = await Promise.all([
      prisma.project.count({ where }),
      prisma.project.findMany({
        where,
        orderBy: { order },
        skip: (page - 1) * limit,
        take: limit
      })
    ]);

    return paginatedResponse(data, makePaginationMeta(page, limit, total));
  },

  async findById(id: string) {
    const entity = await prisma.project.findUnique({ where: { id } });
    if (!entity) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Project not found");
    }
    return entity;
  },

  async update(id: string, payload: Prisma.ProjectUpdateInput) {
    await this.findById(id);
    return prisma.project.update({ where: { id }, data: payload });
  },

  async remove(id: string) {
    await this.findById(id);
    await prisma.project.delete({ where: { id } });
  }
};
