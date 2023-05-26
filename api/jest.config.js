module.exports = {
  roots: ['<rootDir>/src'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^\\~\\/(.*)': '<rootDir>/src/$1',
  },
  testEnvironment: 'node',
  collectCoverageFrom: ['./src/**'],
  testRegex: '((?<!integration)\\.test\\.ts)',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
