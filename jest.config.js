module.exports = {
  browser: true,
  collectCoverage: true,
  coverageDirectory: 'tests/.coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{js,vue}',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/tests/*.js',
    '<rootDir>/tests/.*.js',
    '<rootDir>/tests/*/*.js',
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.(vue)$': 'vue-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(vue-typed-js)/).*/$',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testURL: 'http://localhost/',
}
