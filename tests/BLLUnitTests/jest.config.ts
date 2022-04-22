export default {
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  setupFiles: ["./config.ts"],
  setupFilesAfterEnv: ["./setupTests.ts"],
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
    },
  },
}
