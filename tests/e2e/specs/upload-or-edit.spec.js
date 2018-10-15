describe('the upload-or-edit component', function() {
  beforeEach(function() {
    cy.visit('/upload-or-edit');
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
  
  it('lets you enter securities in one at a time', function() {
    const currentPortfolioContentLength = cy.get('[cy-portfolio-table] tr').its('length');

    cy.get('[data-cy-add-security]').click();

    cy.get('[cy-portfolio-table] tr').its('length')
      .should('eq', currentPortfolioContentLength + 1);
  });

  it.skip('lets you edit the securities in your portfolio', function() {
    
  });
});
