/* eslint no-undef:'off' */

describe('the monitored securities view', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/monitored');
  });

  it('has a graph canvas', () => {
    cy
      .get('canvas#monitored-securities');
  });

  it('has a form to let you add monitored security data', () => {
    cy.contains('TODO write this test');
  });

  it('has an explanation section', () => {
    cy.contains('TODO write this test');
  });
});

describe('the monitored security form', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/monitored');
  });

  it('lets you add monitored security data', () => {
    cy.contains('TODO write this test');
  });

  it('lets you remove monitored security data', () => {
    cy.contains('TODO write this test');
  });
});
