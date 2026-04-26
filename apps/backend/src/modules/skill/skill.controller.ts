import type { Request, Response } from "express";

import { HttpStatus } from "../../common/constants/http";
import { skillService } from "./skill.service";

export const skillController = {
  async create(req: Request, res: Response) {
    const result = await skillService.create(req.body);
    res.status(HttpStatus.CREATED).json(result);
  },

  async findAll(req: Request, res: Response) {
    const result = await skillService.findAll(
      req.query as unknown as Record<string, unknown>
    );
    res.status(HttpStatus.OK).json(result);
  },

  async findById(req: Request, res: Response) {
    const result = await skillService.findById(String(req.params.id));
    res.status(HttpStatus.OK).json(result);
  },

  async update(req: Request, res: Response) {
    const result = await skillService.update(String(req.params.id), req.body);
    res.status(HttpStatus.OK).json(result);
  },

  async remove(req: Request, res: Response) {
    await skillService.remove(String(req.params.id));
    res.status(HttpStatus.NO_CONTENT).send();
  }
};
