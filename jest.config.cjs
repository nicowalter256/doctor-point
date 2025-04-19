// jest.config.cjs
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.cjs',
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.cjs',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!lucide-react).+\\.js$',
  ],
};