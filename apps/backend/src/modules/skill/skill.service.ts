import type { Prisma } from "@prisma/client";

import { HttpStatus } from "../../common/constants/http";
import { ApiError } from "../../common/errors/api-error";
import { paginatedResponse } from "../../common/http/response";
import { makePaginationMeta, parsePaginationQuery } from "../../common/utils/query";
import { prisma } from "../../config/prisma";

export const skillService = {
  async create(payload: Prisma.SkillCreateInput) {
    return prisma.skill.create({ data: payload });
  },

  async findAll(rawQuery: Record<string, unknown>) {
    const { page, limit, order } = parsePaginationQuery(rawQuery);
    const where: Prisma.SkillWhereInput = {};

    if (rawQuery.name) {
      where.name = { contains: String(rawQuery.name), mode: "insensitive" };
    }
    if (rawQuery.category) {
      where.category = {
        contains: String(rawQuery.category),
        mode: "insensitive"
      };
    }

    const [total, data] = await Promise.all([
      prisma.skill.count({ where }),
      prisma.skill.findMany({
        where,
        orderBy: { order },
        skip: (page - 1) * limit,
        take: limit
      })
    ]);

    return paginatedResponse(data, makePaginationMeta(page, limit, total));
  },

  async findById(id: string) {
    const entity = await prisma.skill.findUnique({ where: { id } });
    if (!entity) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Skill not found");
    }
    return entity;
  },

  async update(id: string, payload: Prisma.SkillUpdateInput) {
    await this.findById(id);
    return prisma.skill.update({ where: { id }, data: payload });
  },

  async remove(id: string) {
    await this.findById(id);
    await prisma.skill.delete({ where: { id } });
  }
};
