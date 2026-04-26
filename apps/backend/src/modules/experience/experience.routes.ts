import { Router } from "express";

import { asyncHandler } from "../../common/middleware/async-handler";
import { validate } from "../../common/middleware/validate";
import { experienceController } from "./experience.controller";
import {
  createExperienceSchema,
  experienceListQuerySchema,
  updateExperienceSchema
} from "./experience.validation";

export const experienceRouter = Router();

experienceRouter.post(
  "/",
  validate(createExperienceSchema),
  asyncHandler(experienceController.create)
);
experienceRouter.get(
  "/",
  validate(experienceListQuerySchema, "query"),
  asyncHandler(experienceController.findAll)
);
experienceRouter.get("/:id", asyncHandler(experienceController.findById));
experienceRouter.put(
  "/:id",
  validate(updateExperienceSchema),
  asyncHandler(experienceController.update)
);
experienceRouter.delete("/:id", asyncHandler(experienceController.remove));
