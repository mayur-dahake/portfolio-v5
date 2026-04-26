import { Router } from "express";

import { validate } from "../../common/middleware/validate";
import { userController } from "./user.controller";
import {
  createUserSchema,
  updateUserSchema,
  userListQuerySchema
} from "./user.validation";

export const userRouter = Router();

userRouter.post("/", validate(createUserSchema), userController.create);
userRouter.get(
  "/",
  validate(userListQuerySchema, "query"),
  userController.findAll
);
userRouter.get("/:id", userController.findById);
userRouter.patch("/:id", validate(updateUserSchema), userController.update);
userRouter.delete("/:id", userController.remove);
