import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { HttpStatus } from "../constants/http";
import { ApiError } from "../errors/api-error";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      message: error.message,
      details: error.details
    });
    return;
  }

  if (error instanceof ZodError) {
    res.status(HttpStatus.BAD_REQUEST).json({
      message: "Validation failed",
      errors: error.flatten()
    });
    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(HttpStatus.CONFLICT).json({ message: "Duplicate value found" });
      return;
    }

    if (error.code === "P2025") {
      res.status(HttpStatus.NOT_FOUND).json({ message: "Record not found" });
      return;
    }
  }

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal server error"
  });
};
