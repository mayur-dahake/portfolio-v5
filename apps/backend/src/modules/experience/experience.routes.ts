import { Router } from "express";

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
  experienceController.create
);
experienceRouter.get(
  "/",
  validate(experienceListQuerySchema, "query"),
  experienceController.findAll
);
experienceRouter.get("/:id", experienceController.findById);
experienceRouter.put(
  "/:id",
  validate(updateExperienceSchema),
  experienceController.update
);
experienceRouter.delete("/:id", experienceController.remove);
