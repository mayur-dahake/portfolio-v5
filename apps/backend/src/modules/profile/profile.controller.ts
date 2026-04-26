import type { Request, Response } from "express";

import { HttpStatus } from "../../common/constants/http";
import { profileService } from "./profile.service";

export const profileController = {
  async create(req: Request, res: Response) {
    const result = await profileService.create(req.body);
    res.status(HttpStatus.CREATED).json(result);
  },

  async getSingle(_req: Request, res: Response) {
    const result = await profileService.getSingle();
    res.status(HttpStatus.OK).json(result);
  },

  async update(req: Request, res: Response) {
    const result = await profileService.update(String(req.params.id), req.body);
    res.status(HttpStatus.OK).json(result);
  },

  async updateSingle(req: Request, res: Response) {
    const result = await profileService.updateSingle(req.body);
    res.status(HttpStatus.OK).json(result);
  },

  async remove(req: Request, res: Response) {
    await profileService.remove(String(req.params.id));
    res.status(HttpStatus.NO_CONTENT).send();
  }
};
