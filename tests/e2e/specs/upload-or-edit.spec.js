describe('the home view', function() {
  before(function() {
    cy.visit('/');
  });
  
  it('has a file input', function() {
    cy.get('input[type=file]')
      .should('have.attr', 'accept','.csv')
      .should('not.have.attr','multiple')
      .should('not.have.attr','required');
  });

  it('has an "upload" button', function() {
    cy.get('[data-cy-upload]');
  });

  //skip until you get the API ready
  //https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  //for drag and drop
  it.skip('lets you drag and drop for file upload', function() {
    cy.get('[data-cy-dropzone]');

  });

  //skip until you get the API ready
  it.skip('gets an array of objects from the API after file upload', function() {
    
  });

  function enterSecurityData() {
    cy.get('#symbol')
      .type('vtibx')
      .get('#friendly-name')
      .type('Vanguard Total International Bond Index Fund Investor Shares')
      .get('#num-shares')
      .type('200')
      .get ('#pct-bond-international')
      .type(100)
      .type('{enter}');
  }
  
  it('lets you enter securities in one at a time', function() {
    let currentPortfolioContentLength;

    cy.get('[cy-portfolio-table] tr')
     .then($trArray => {
       currentPortfolioContentLength = $trArray.length;

       enterSecurityData();
       
       cy.get('[cy-portfolio-table] tr')
         .its('length')
         .should('be.gt', currentPortfolioContentLength);
     });
  });

  it.skip('lets you edit the securities in your portfolio', function() {
    
  });
});
