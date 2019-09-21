/* eslint no-undef:'off' */

describe('the monitored securities view', () => {
  before(() => {
    cy.visit('http://localhost:8080/#/monitored');
  });

  it('has a graph canvas', () => {
    cy
      .get('canvas#monitored-securities');
  });

  it('has an explanation section', () => {
    cy
      .get('#welcome-text p')
      .should(($p) => {
        expect($p[0].innerText.length).to.be.gt(0);
      });
  });
});
