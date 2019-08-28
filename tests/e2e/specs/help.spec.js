/* eslint no-undef:'off' */

describe('the help view', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/help');
  });

  it('has a top-level id of help', () => {
    cy.get('#help');
  });

  it('has at least one row with content', () => {
    cy
      .get('#help .row p')
      .its('length')
      .should('be.gte', 1);

    cy
      .get('#help .row p')
      .each(($paragraph) => {
        expect($paragraph[0].innerText.length)
          .to.be.gt(0);
      });
  });
});
