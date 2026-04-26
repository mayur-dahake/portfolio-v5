import { Router } from "express";

import { experienceRouter } from "../modules/experience/experience.routes";
import { profileRouter } from "../modules/profile/profile.routes";
import { projectRouter } from "../modules/project/project.routes";
import { skillRouter } from "../modules/skill/skill.routes";
import { userRouter } from "../modules/user/user.routes";

export const apiRouter = Router();

apiRouter.use("/projects", projectRouter);
apiRouter.use("/experiences", experienceRouter);
apiRouter.use("/skills", skillRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/users", userRouter);
