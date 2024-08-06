// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'html', 'json','lcov'],
     collectCoverageFrom: [
    'src/controllers/authController.ts',
    'src/controllers/studentController.ts',
    'src/middlewares/authMiddleware.ts',
    'src/middlewares/permissionMiddleware.ts',
  ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    },
  };
  