describe("Check links", () => {;
  it("course link", () => {
    const pageUrl = "/resume"
    cy.visit(pageUrl);
    cy.get("a:contains(courses)").should('have.attr', 'href', 'courses');
    cy.get("a:contains(courses)").click();
    cy.contains("Traditional Classes");
  });
});
