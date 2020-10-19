const { resolve } = require('path');

module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".e2e-spec.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  rootDir: 'src',
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  clearMocks: true,
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    },
  },
  moduleNameMapper: {
    '^app/(.*)$': resolve(__dirname, './src/app/$1'),
    '^config/(.*)$': resolve(__dirname, './src/config/$1'),
    '^utils/(.*)$': resolve(__dirname, './src/utils/$1'),
    '^database/(.*)$': resolve(__dirname, './src/database/$1'),
    '^features/(.*)$': resolve(__dirname, './src/features/$1'),
    '^geoCodeApi/(.*)$': resolve(__dirname, './src/features/geoCodeApi/$1'),
    '^offers/(.*)$': resolve(__dirname, './src/features/offers/$1'),
    '^companies/(.*)$': resolve(__dirname, './src/features/companies/$1'),
    '^offices/(.*)$': resolve(__dirname, './src/features/offices/$1'),
  },
  verbose: true,
}
