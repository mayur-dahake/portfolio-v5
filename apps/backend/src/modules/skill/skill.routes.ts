import { Router } from "express";

import { asyncHandler } from "../../common/middleware/async-handler";
import { validate } from "../../common/middleware/validate";
import { skillController } from "./skill.controller";
import {
  createSkillSchema,
  skillListQuerySchema,
  updateSkillSchema
} from "./skill.validation";

export const skillRouter = Router();

skillRouter.post("/", validate(createSkillSchema), asyncHandler(skillController.create));
skillRouter.get(
  "/",
  validate(skillListQuerySchema, "query"),
  asyncHandler(skillController.findAll)
);
skillRouter.get("/:id", asyncHandler(skillController.findById));
skillRouter.put("/:id", validate(updateSkillSchema), asyncHandler(skillController.update));
skillRouter.delete("/:id", asyncHandler(skillController.remove));
