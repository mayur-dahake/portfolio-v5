/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests/integration"],
  clearMocks: true,
  moduleFileExtensions: ["ts", "js", "json"],
  testMatch: ["**/*.integration.test.ts"],
  setupFiles: ["<rootDir>/tests/setup.ts"]
};
