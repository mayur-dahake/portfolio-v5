import type { Request, Response } from "express";

import { HttpStatus } from "../constants/http";

export const notFound = (_req: Request, res: Response): void => {
  res.status(HttpStatus.NOT_FOUND).json({ message: "Route not found" });
};
