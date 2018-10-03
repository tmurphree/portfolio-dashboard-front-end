describe('the upload-or-edit component', function() {
  beforeEach(function() {
    cy.visit('/upload-or-edit');
  });
  
  it('has a file input', function() {
    cy.get('input[type=file]');
  });

  it('has an "upload" button', function() {
    cy.get('[data-cy-upload]')
      //disabled until we get the API ready
      .should('have.prop', 'disabled');
  });

  //skip until you get the API ready
  //https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
  //for drag and drop
  it.skip('lets you drag and drop for file upload', function() {
  
  });

  //skip until you get the API ready
  it.skip('gets an array of objects from the API after file upload', function() {
    
  });
  

  it('lets you enter securities in one at a time', function() {
    
  });

  it('lets you edit the securities in your portfolio', function() {
    
  });
});
