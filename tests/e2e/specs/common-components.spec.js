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

  it('has a sidebar that goes all the way down', function() {
    cy.get('[data-cy-sidebar]')
      .should(($sidebar) => {
        expect($sidebar).to.have.css('overflow', 'hidden');
      });
  });
  


  
});
