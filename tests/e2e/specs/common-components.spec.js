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

  it('has a disclaimer', function() {
    cy.get('[data-cy-disclaimer]')
      .should('be.visible')
      .should('have.text','Do NOT base actual trades on the data from this site.  This site is UNFIT to be the basis for any real-world trading.')
      .should('have.css','color','rgb(255, 0, 0)');
  });

  it('shows up on all screen sizes', function() {
    function checkVisibility(selector) {
      cy
        .get(selector)
        .should('be.visible');
    }
    
    cy.viewport('macbook-11');
    checkVisibility('[data-cy-top-bar]');
    cy.viewport('ipad-2');
    checkVisibility('[data-cy-top-bar]');
    cy.viewport('iphone-5');
    checkVisibility('[data-cy-top-bar]');
    cy.viewport('macbook-11');
  });
  
  
});

describe('side bar', function() {
  beforeEach(function() {
    cy.visit('/');
  });

  it('has appropriate styling', function() {
    cy.get('[data-cy-sidebar]')
      .should('have.css', 'overflow', 'hidden')
      .should('have.css', 'max-width', '16.6667%')
      .its('height').should('be.gte', '600px');
  });

  it('has these menus', function() {
    cy.get('[data-cy-sidebar] li.nav-item')
      .its('length').should('eq', 5);

    cy.get('[data-cy-sidebar] li.nav-item a')
      .should(($link) => {
        expect($link[0]).to.have.class('active');     
        expect($link[0].innerText).to.contain('Home');

        expect($link[1].innerText).to.contain('Graph view');
        expect($link[2].innerText).to.contain('Table view');
        expect($link[3].innerText).to.contain('Monitored securities');

        expect($link[4].innerText).to.contain('Trade simulator');
      });
  });
  
  it('goes to the appropriate partials on click', function() {
    const urlMapper = [
      { expectedUrl: '/home', linkText: 'Home' },
      { expectedUrl: '/current-graph', linkText: 'Graph view' },
      { expectedUrl: '/current-table', linkText: 'Table view' },
      { expectedUrl: '/monitored', linkText: 'Monitored securities' },
      { expectedUrl: '/trade-simulator', linkText: 'Trade simulator' },
    ];

    urlMapper.forEach(element => {
      cy.contains(element.linkText).click();
      cy.url().should('contain', element.expectedUrl);
    });
  });

  it('shows up on all screen sizes', function() {
    function checkVisibility(selector) {
      cy
        .get(selector)
        .should('be.visible');
    }
    
    cy.viewport('macbook-11');
    checkVisibility('[data-cy-sidebar]');
    cy.viewport('ipad-2');
    checkVisibility('[data-cy-sidebar]');
    cy.viewport('iphone-5');
    checkVisibility('[data-cy-sidebar]');
  });
});
