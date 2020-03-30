// Use unusual structure so we can run Cypress tests with .should(callback).
// See https://github.com/cypress-io/cypress/issues/2945.

const regularSetup = {
  presets: [[
    '@vue/app',
    { useBuiltIns: 'entry' },
  ]],
};

module.exports = process.env.CYPRESS_ENV ?
  {} :
  regularSetup;
