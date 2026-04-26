import { Router } from "express";

import { validate } from "../../common/middleware/validate";
import { skillController } from "./skill.controller";
import {
  createSkillSchema,
  skillListQuerySchema,
  updateSkillSchema
} from "./skill.validation";

export const skillRouter = Router();

skillRouter.post("/", validate(createSkillSchema), skillController.create);
skillRouter.get(
  "/",
  validate(skillListQuerySchema, "query"),
  skillController.findAll
);
skillRouter.get("/:id", skillController.findById);
skillRouter.put("/:id", validate(updateSkillSchema), skillController.update);
skillRouter.delete("/:id", skillController.remove);
