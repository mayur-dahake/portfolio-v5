import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { errorHandler } from "./common/middleware/error-handler";
import { notFound } from "./common/middleware/not-found";
import { apiRouter } from "./routes";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", apiRouter);
app.use(notFound);
app.use(errorHandler);
