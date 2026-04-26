import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

import { HttpStatus } from "../constants/http";

export const validate =
  (schema: z.ZodTypeAny, target: "body" | "query" = "body") =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      res.status(HttpStatus.BAD_REQUEST).json({
        message: "Validation failed",
        errors: result.error.flatten()
      });
      return;
    }

    if (target === "body") {
      req.body = result.data;
    }
    next();
  };
