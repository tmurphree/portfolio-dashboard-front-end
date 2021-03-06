/* eslint no-undef:'off' */

/**
 * @description Tests for the top bar and side nav.
*/

const { checkIsHidden, checkIsVisible } = require('../support/checkForVisibility');

describe('top bar', () => {
  before(() => {
    cy.visit('/');
  });

  it('has the logo', () => {
    cy.contains('div', 'Portfolio Dashboard');
  });

  it('has the appropriate menu items on small screens', () => {
    const collapsableNavElements = [
      '[data-cy="home-sm-nav"]',
      '[data-cy="graph-sm-nav"]',
      '[data-cy="monitored-sm-nav"]',
      '[data-cy="about-sm-nav"]',
      '[data-cy="help-sm-nav"]',
    ];

    cy.viewport('iphone-5');

    // open the nav dropdown
    cy.get('[data-cy="top-nav-toggle"]').click();

    // look for the sm nav elements
    collapsableNavElements.forEach((el) => checkIsVisible(el));

    // close the nav dropdown
    cy.get('[data-cy="top-nav-toggle"]').click();

    // make sure the md nav elements are hidden
    [
      '[data-cy="about-md-nav"]',
      '[data-cy="help-md-nav"]',
    ].forEach((el) => checkIsHidden(el));
  });

  it('has the appropriate menu items on medium screens', () => {
    cy.viewport('ipad-2');

    // look for the md nav elements
    [
      '[data-cy="about-md-nav"]',
      '[data-cy="help-md-nav"]',
    ].forEach((el) => checkIsVisible(el));

    // make sure the sm nav elements are hidden
    [
      '[data-cy="top-nav-toggle"]',
      '[data-cy="home-sm-nav"]',
      '[data-cy="graph-sm-nav"]',
      '[data-cy="monitored-sm-nav"]',
      '[data-cy="about-sm-nav"]',
      '[data-cy="help-sm-nav"]',
    ].forEach((el) => checkIsHidden(el));
  });

  it('has a disclaimer', () => {
    cy.get('[data-cy-disclaimer]')
      .should('be.visible')
      .should('contain', 'Do NOT base actual trades on the data from this site.')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  });

  it('shows up on all screen sizes', () => {
    cy.viewport('macbook-11');
    checkIsVisible('[data-cy-top-bar]');
    cy.viewport('ipad-2');
    checkIsVisible('[data-cy-top-bar]');
    cy.viewport('iphone-5');
    checkIsVisible('[data-cy-top-bar]');
    cy.viewport('macbook-11');
  });
});

describe('side bar', () => {
  before(() => {
    cy.visit('/');
  });

  it('has appropriate styling', () => {
    cy.get('[data-cy-sidebar-md]')
      .should('have.css', 'overflow', 'visible')
      .should('have.css', 'max-width', '16.6667%')
      .its('height')
      .should('be.gte', '600px');
  });

  it('has these menus', () => {
    cy.get('[data-cy-sidebar-md] li.nav-item')
      .its('length').should('eq', 4);

    cy.get('[data-cy-sidebar-md] li.nav-item a')
      .should(($link) => {
        expect($link[0]).to.have.class('active');
        expect($link[0].innerText).to.contain('Home');

        expect($link[1].innerText).to.contain('Graph view');
        expect($link[2].innerText).to.contain('Monitored securities');
      });
  });

  it('goes to the appropriate partials on click', () => {
    const urlMapper = [
      { expectedUrl: '/', linkText: 'Home' },
      { expectedUrl: '/graph', linkText: 'Graph view' },
      { expectedUrl: '/monitored', linkText: 'Monitored securities' },
    ];

    urlMapper.forEach((element) => {
      cy.get('[data-cy-sidebar-md]').contains(element.linkText).click();
      cy.url().should('contain', element.expectedUrl);
    });
  });

  it('shows up on all appropriate screen sizes', () => {
    cy.viewport('macbook-11');
    checkIsVisible('[data-cy-sidebar-md]');
    cy.viewport('ipad-2');
    checkIsVisible('[data-cy-sidebar-md]');
    cy.viewport('iphone-5');
    checkIsHidden('[data-cy-sidebar-md]');
  });
});
