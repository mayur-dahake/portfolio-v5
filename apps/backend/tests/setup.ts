import path from "path";
import { config } from "dotenv";

// Always load .env.test for integration tests (this file is only used by jest.integration.config.js)
config({
  path: path.resolve(__dirname, "../.env.test"),
  override: true
});
