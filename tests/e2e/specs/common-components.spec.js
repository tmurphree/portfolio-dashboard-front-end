/**
 * @description Tests for the top bar and side nav.
*/


describe('top bar', () => {
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

describe('side bar', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('has appropriate styling', function() {
    cy.get('[data-cy-sidebar]')
      .should('have.css', 'overflow', 'hidden')
      .should('have.css', 'max-width', '25%')
      .its('height').should('be.gte', '600px');
  });

  it('has these menus', function() {
    cy.get('[data-cy-sidebar] li.nav-item')
      .its('length').should('eq', 5);

    cy.get('[data-cy-sidebar] li.nav-item a')
      .should(($link) => {
        expect($link[0]).to.have.class('active');     
        expect($link[0].innerText).to.contain('Upload or edit current assets');

        expect($link[1].innerText).to.contain('Graph view');
        expect($link[2].innerText).to.contain('Table view');
        expect($link[3].innerText).to.contain('Monitored securities');

        expect($link[4].innerText).to.contain('Trade simulator');
      });
  });
  
  
  
});
