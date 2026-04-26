import type { Prisma } from "@prisma/client";

import { HttpStatus } from "../../common/constants/http";
import { ApiError } from "../../common/errors/api-error";
import { prisma } from "../../config/prisma";

export const profileService = {
  async create(payload: Prisma.ProfileCreateInput) {
    const existing = await prisma.profile.findFirst();
    if (existing) {
      throw new ApiError(
        HttpStatus.CONFLICT,
        "Profile already exists. Update the existing profile instead."
      );
    }

    return prisma.profile.create({ data: payload });
  },

  async getSingle() {
    const profile = await prisma.profile.findFirst({
      orderBy: { createdAt: "asc" }
    });
    if (!profile) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Profile not found");
    }
    return profile;
  },

  async updateSingle(payload: Prisma.ProfileUpdateInput) {
    const profile = await prisma.profile.findFirst({
      orderBy: { createdAt: "asc" }
    });
    if (!profile) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Profile not found");
    }
    return prisma.profile.update({ where: { id: profile.id }, data: payload });
  },

  async update(id: string, payload: Prisma.ProfileUpdateInput) {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Profile not found");
    }

    return prisma.profile.update({ where: { id }, data: payload });
  },

  async remove(id: string) {
    const profile = await prisma.profile.findUnique({ where: { id } });
    if (!profile) {
      throw new ApiError(HttpStatus.NOT_FOUND, "Profile not found");
    }
    await prisma.profile.delete({ where: { id } });
  }
};
