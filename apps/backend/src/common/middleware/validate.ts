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
        errors: z.flattenError(result.error)
      });
      return;
    }

    if (target === "body") {
      req.body = result.data;
    } else {
      // Write coerced/transformed values back so handlers receive correct types
      Object.assign(req.query, result.data);
    }
    next();
  };
