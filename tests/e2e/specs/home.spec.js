/* eslint no-undef:'off' */

describe('the home view', () => {
  before(() => {
    cy.visit('/');
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

  it('calculates the security values', () => {
    cy.wait(6000);
    cy.get('[data-cy="value-cell"]')
      .should(($td) => {
        const nodes = [...$td];
        nodes.forEach((el) => {
          expect(parseFloat(el.innerText)).to.be.greaterThan(0);
        });
      });
  });

  it('calculates the percent of portfolio values', () => {
    cy.get('[data-cy="pct-of-portfolio-cell"]')
      .should(($td) => {
        const nodes = [...$td];
        nodes.forEach((el) => {
          expect(parseFloat(el.innerText)).to.be.greaterThan(0);
        });
      });
  });

  it('starts out with a disabled "Add Security" button', () => {
    cy.get('[data-cy-add-security]')
      .should('be.disabled');
  });

  it('lets you edit the securities in your portfolio', () => {
    cy
      .get('[data-cy-edit="ITOT"]')
      .click()
      .get('#num-shares')
      .clear()
      .get('#num-shares')
      .type('200')
      .get('[data-cy-add-security]')
      .click()
      .get('[data-cy-num-shares-cell="ITOT"]')
      .should(($td) => {
        expect($td[0].innerText).to.equal('200');
      });
  });

  it('lets you enter securities in one at a time', () => {
    cy.get('[data-cy="portfolio-table"] tr')
      .then(($trArray) => {
        const currentPortfolioContentLength = $trArray.length;

        enterSecurityData();

        cy.get('[data-cy="portfolio-table"] tr')
          .its('length')
          .should('eq', (currentPortfolioContentLength + 1));
      });
  });

  it('lets you remove a security', () => {
    cy.get('[data-cy="portfolio-table"] tr')
      .then(($trArray) => {
        const currentPortfolioContentLength = $trArray.length;

        cy.contains('Remove').click();

        cy.get('[data-cy="portfolio-table"] tr')
          .its('length')
          .should('eq', (currentPortfolioContentLength - 1));
      });
  });

  it('lets you clear the portfolio', () => {
    cy.contains('Clear current portfolio').click();

    cy.get('[data-cy="portfolio-table"] tr')
      .should('not.exist');
    // reset back to default
    cy.reload();
  });
});
