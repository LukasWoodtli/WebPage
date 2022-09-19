describe('TOC strings', () => {

  const pages = ["/blog", "/blog/scheme"];

  it("should not contain the string [TOC]", () => {
    pages.forEach(page => {
      cy.visit(page);
      // wait for page to be loaded
      cy.get('body').contains("Lukas Woodtli");
      cy.get('body').should('not.contain', '[TOC]');
  });
  });
});


