
describe('the top bar', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('has the logo', () => {
    cy.contains('nav span','Portfolio Dashboard');
  });

  it('has the appropriate menu items', function() {
    ['About', 'Save', 'Help'].forEach(element => {
      cy.get(`[data-cy-${element.toLocaleLowerCase()}]`)
        .should('have.attr', 'href', '#/' + element.toLocaleLowerCase());
    });
  });
});