// https://docs.cypress.io/api/introduction/api.html

describe('home component', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('Visits the app root url', () => {
    cy.contains('h1', 'Welcome to Your Vue.js App');
  });
});