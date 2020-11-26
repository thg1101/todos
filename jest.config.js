module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    'server/**/*.{js,vue}',
    '!server/constants.js',
    '!src/router/index.js', // No need to the router index
    '!src/main.js' // No need to cover bootstrap file
  ]
}
