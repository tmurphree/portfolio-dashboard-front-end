/* eslint no-undef:'off' */

describe('the trade simulator view', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/trade-simulator');
  });

  it('has instructions', () => {
    cy.get('p[data-cy="instructions"]')
      .should(($p) => {
        expect($p).to.have.length(1);
        console.log($p[0]);
        expect($p[0].innerText.length).to.be(1);
      });
  });

  it('shows the current state', () => {
    cy.get('canvas[data-cy="current-chart"');
  });

  it('hides the simulated chart and differences table initially', () => {
    cy.get('canvas[data-cy="simulated-chart"')
      .should('not.be.visible');

    cy.get('table[data-cy="differences-table"')
      .should('not.be.visible');
  });

  it.skip('lets you make alterations', () => {
    cy.get('form');
  });

  it('shows the state after those alterations', () => {
    cy.get('canvas[data-cy="simulated-chart"');

    cy.get('table[data-cy="differences-table" td')
      .its('length')
      .should('be.gte', 1);
  });
});
