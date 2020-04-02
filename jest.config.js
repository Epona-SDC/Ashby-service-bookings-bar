module.exports = {
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/styleMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
  verbose: true
}