import type { Request, Response } from "express";

import { HttpStatus } from "../../common/constants/http";
import { projectService } from "./project.service";

export const projectController = {
  async create(req: Request, res: Response) {
    const result = await projectService.create(req.body);
    res.status(HttpStatus.CREATED).json(result);
  },

  async findAll(req: Request, res: Response) {
    const result = await projectService.findAll(
      req.query as unknown as Record<string, unknown>
    );
    res.status(HttpStatus.OK).json(result);
  },

  async findById(req: Request, res: Response) {
    const result = await projectService.findById(String(req.params.id));
    res.status(HttpStatus.OK).json(result);
  },

  async update(req: Request, res: Response) {
    const result = await projectService.update(String(req.params.id), req.body);
    res.status(HttpStatus.OK).json(result);
  },

  async remove(req: Request, res: Response) {
    await projectService.remove(String(req.params.id));
    res.status(HttpStatus.NO_CONTENT).send();
  }
};
