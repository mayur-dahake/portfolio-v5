import type { Request, Response } from "express";

import { HttpStatus } from "../../common/constants/http";
import { experienceService } from "./experience.service";

export const experienceController = {
  async create(req: Request, res: Response) {
    const result = await experienceService.create(req.body);
    res.status(HttpStatus.CREATED).json(result);
  },

  async findAll(req: Request, res: Response) {
    const result = await experienceService.findAll(
      req.query as unknown as Record<string, unknown>
    );
    res.status(HttpStatus.OK).json(result);
  },

  async findById(req: Request, res: Response) {
    const result = await experienceService.findById(String(req.params.id));
    res.status(HttpStatus.OK).json(result);
  },

  async update(req: Request, res: Response) {
    const result = await experienceService.update(String(req.params.id), req.body);
    res.status(HttpStatus.OK).json(result);
  },

  async remove(req: Request, res: Response) {
    await experienceService.remove(String(req.params.id));
    res.status(HttpStatus.NO_CONTENT).send();
  }
};
