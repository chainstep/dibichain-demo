module.exports = {
    roots: [
        "<rootDir>/test"
    ],
    transform: {
        "^.+\\.ts?$": "ts-jest"
    },
    setupFilesAfterEnv: [
        "./test/setup.ts"
    ],
    coverageReporters: ["text"],
    // coverageReporters: ["text", "json", "html"],
    collectCoverageFrom: [
        "src/**/*.ts",
    ],
    coverageDirectory: "coverage"
};