import { Router } from "express";

import { asyncHandler } from "../../common/middleware/async-handler";
import { validate } from "../../common/middleware/validate";
import { profileController } from "./profile.controller";
import { createProfileSchema, updateProfileSchema } from "./profile.validation";

export const profileRouter = Router();

profileRouter.post("/", validate(createProfileSchema), asyncHandler(profileController.create));
profileRouter.get("/", asyncHandler(profileController.getSingle));
profileRouter.put("/", validate(updateProfileSchema), asyncHandler(profileController.updateSingle));
profileRouter.patch("/:id", validate(updateProfileSchema), asyncHandler(profileController.update));
profileRouter.delete("/:id", asyncHandler(profileController.remove));
