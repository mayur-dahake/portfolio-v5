import { Router } from "express";

import { asyncHandler } from "../../common/middleware/async-handler";
import { validate } from "../../common/middleware/validate";
import { userController } from "./user.controller";
import {
  createUserSchema,
  updateUserSchema,
  userListQuerySchema
} from "./user.validation";

export const userRouter = Router();

userRouter.post("/", validate(createUserSchema), asyncHandler(userController.create));
userRouter.get("/", validate(userListQuerySchema, "query"), asyncHandler(userController.findAll));
userRouter.get("/:id", asyncHandler(userController.findById));
userRouter.patch("/:id", validate(updateUserSchema), asyncHandler(userController.update));
userRouter.delete("/:id", asyncHandler(userController.remove));
