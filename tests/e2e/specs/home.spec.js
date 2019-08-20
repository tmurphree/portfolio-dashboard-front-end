/* eslint no-undef:'off' */

describe('the home view', () => {
  before(() => {
    cy.visit('/');
  });

  it('has a file input', () => {
    cy.get('input[type=file]')
      .should('have.attr', 'accept', '.csv')
      .should('not.have.attr', 'multiple')
      .should('not.have.attr', 'required');
  });

  const enterSecurityData = function enterSecurityData() {
    cy.get('#symbol')
      .type('vtibx')
      .get('#friendly-name')
      .type('Vanguard Total International Bond Index Fund Investor Shares')
      .get('#num-shares')
      .type('200')
      .get('#pct-bond-international')
      .type(100)
      .type('{enter}');
  };

  it('lets you enter securities in one at a time', () => {
    cy.get('[cy-portfolio-table] tr')
      .then(($trArray) => {
        const currentPortfolioContentLength = $trArray.length;

        enterSecurityData();

        cy.get('[cy-portfolio-table] tr')
          .its('length')
          .should('eq', (currentPortfolioContentLength + 1));
      });
  });

  it('lets you remove a security', () => {
    cy.get('[cy-portfolio-table] tr')
      .then(($trArray) => {
        const currentPortfolioContentLength = $trArray.length;

        cy.contains('Remove').click();

        cy.get('[cy-portfolio-table] tr')
          .its('length')
          .should('eq', (currentPortfolioContentLength - 1));
      });
  });

  it('lets you clear the portfolio', () => {
    cy.contains('Clear current portfolio').click();

    cy.get('[cy-portfolio-table] tr')
      .should('not.exist');
  });

  it.skip('lets you edit the securities in your portfolio', () => {

  });

  // skip until you get the API ready
  it.skip('gets an array of objects from the API after file upload', () => {

  });
});
