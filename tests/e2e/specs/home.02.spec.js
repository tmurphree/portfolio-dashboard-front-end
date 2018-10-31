describe('the home view', () => {
  before(() => {
    cy.visit('/');
  });

  it('lets you clear the portfolio', () => {
    cy.contains('Clear current portfolio').click();

    cy.get('[cy-portfolio-table] tr')
      .should('not.exist');
  });
});