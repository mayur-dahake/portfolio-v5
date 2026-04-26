import { Router } from "express";

import { validate } from "../../common/middleware/validate";
import { profileController } from "./profile.controller";
import { createProfileSchema, updateProfileSchema } from "./profile.validation";

export const profileRouter = Router();

profileRouter.post(
  "/",
  validate(createProfileSchema),
  profileController.create
);
profileRouter.get("/", profileController.getSingle);
profileRouter.put(
  "/",
  validate(updateProfileSchema),
  profileController.updateSingle
);
profileRouter.patch(
  "/:id",
  validate(updateProfileSchema),
  profileController.update
);
profileRouter.delete("/:id", profileController.remove);
