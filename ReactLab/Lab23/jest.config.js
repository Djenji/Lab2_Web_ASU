export default {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    transform: {
        "^.+\\.(js|jsx|mjs)$": "babel-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
        "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    },
    testPathIgnorePatterns: ["/node_modules/", "/build/", "/dist/"],
    transformIgnorePatterns: ["/node_modules/(?!your-module-to-transform)"],
    // Дополнительные рекомендуемые настройки:
    testMatch: [
        "<rootDir>/src/**/*.{spec,test}.{js,jsx}",
        "<rootDir>/tests/**/*.{spec,test}.{js,jsx}",
    ],
    verbose: true,
    collectCoverage: true,
    coverageDirectory: "<rootDir>/coverage",
    coverageReporters: ["text", "lcov"],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "/tests/",
        "/src/index.js",
        "/src/setupTests.js",
    ],
};
