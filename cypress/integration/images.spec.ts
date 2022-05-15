describe('Images in markdown files', () => {

    before(() => {
      cy.visit('/blog/language_implementation_patterns');
    });

    it('check links and alt text', () => {
      cy.get('img').eq(2).then(($el) => { // eq used as "array" index
          expect($el).to.have.attr("src").to.contain("/one_or_more.svg");
          expect($el).to.have.attr("alt").to.eq("One or more");
      });
    });
});
