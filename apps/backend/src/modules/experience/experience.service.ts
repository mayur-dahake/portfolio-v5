import type { Prisma } from "@prisma/client";

import { HttpStatus } from "../../common/constants/http";
import { ApiError } from "../../common/errors/api-error";
import { paginatedResponse } from "../../common/http/response";
import {
  makePaginationMeta,
  parsePaginationQuery
} from "../../common/utils/query";
import { prisma } from "../../config/prisma";

export const experienceService = {
  async create(payload: Prisma.ExperienceCreateInput) {
    return prisma.experience.create({ data: payload });
  },

  async findAll(rawQuery: Record<string, unknown>) {
    const { page, limit, order } = parsePaginationQuery(rawQuery);
    const where: Prisma.ExperienceWhereInput = {};

    if (rawQuery.company) {
      where.company = {
        contains: rawQuery.company as string,
        mode: "insensitive"
      };
    }
    if (rawQuery.title) {
      where.title = { contains: rawQuery.title as string, mode: "insensitive" };
    }
    if (rawQuery.isCurrent !== undefined) {
      where.isCurrent = rawQuery.isCurrent as boolean;
    }
    if (rawQuery.tech) {
      where.techStack = { has: rawQuery.tech as string };
    }

    const [total, data] = await Promise.all([
      prisma.experience.count({ where }),
      prisma.experience.findMany({
        where,
        orderBy: { order },
        skip: (page - 1) * limit,
        take: limit
      })
    ]);

    return paginatedResponse(data, makePaginationMeta(page, limit, total));
  },

  async findById(id: string) {
    const entity = await prisma.experience.findUnique({ where: { id } });
    if (!entity) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Experience not found");
    }
    return entity;
  },

  async update(id: string, payload: Prisma.ExperienceUpdateInput) {
    await this.findById(id);
    return prisma.experience.update({ where: { id }, data: payload });
  },

  async remove(id: string) {
    await this.findById(id);
    await prisma.experience.delete({ where: { id } });
  }
};
