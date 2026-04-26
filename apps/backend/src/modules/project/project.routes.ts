import { Router } from "express";

import { asyncHandler } from "../../common/middleware/async-handler";
import { validate } from "../../common/middleware/validate";
import { projectController } from "./project.controller";
import {
  createProjectSchema,
  projectListQuerySchema,
  updateProjectSchema
} from "./project.validation";

export const projectRouter = Router();

projectRouter.post(
  "/",
  validate(createProjectSchema),
  asyncHandler(projectController.create)
);
projectRouter.get(
  "/",
  validate(projectListQuerySchema, "query"),
  asyncHandler(projectController.findAll)
);
projectRouter.get("/:id", asyncHandler(projectController.findById));
projectRouter.put(
  "/:id",
  validate(updateProjectSchema),
  asyncHandler(projectController.update)
);
projectRouter.delete("/:id", asyncHandler(projectController.remove));
