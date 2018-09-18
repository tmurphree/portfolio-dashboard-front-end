/**
 * @description Tests for the top bar and side nav.
*/


describe('the top bar', () => {
  beforeEach(function() {
    cy.visit('/');
  });

  it('has the logo', () => {
    cy.contains('div','Portfolio Dashboard');
  });

  it('has the appropriate menu items', function() {
    ['About', 'Save', 'Help'].forEach(element => {
      cy.get(`[data-cy-${element.toLocaleLowerCase()}]`)
        .should('have.attr', 'href', '#/' + element.toLocaleLowerCase());
    });
  });
});