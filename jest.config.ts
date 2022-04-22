export default {
  coverageProvider: "v8",
  moduleDirectories: [
    "node_modules",
    "tests/BLLUnitTests/src",
    "tests/APITests/src",
  ],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFilesAfterEnv: ["./setupTests.ts"],
}
