import { Router } from "express";

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
  projectController.create
);
projectRouter.get(
  "/",
  validate(projectListQuerySchema, "query"),
  projectController.findAll
);
projectRouter.get("/:id", projectController.findById);
projectRouter.patch(
  "/:id",
  validate(updateProjectSchema),
  projectController.update
);
projectRouter.delete("/:id", projectController.remove);
