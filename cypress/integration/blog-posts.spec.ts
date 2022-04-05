describe('BlogPosts', () => {

  before(() => {
    cy.visit('/angular_velocity');
  });


  it('gets the metadata sidebar', function() {
    cy.get('[data-test="metadata-sidebar"]').contains("Category");
    cy.get('[data-test="metadata-sidebar"]').contains("Mathematics");
    cy.get('[data-test="metadata-sidebar"]').contains("Tags");
    cy.get('[data-test="metadata-sidebar"]').contains("Robotics");
    cy.get('[data-test="metadata-sidebar"]').contains("Created");
    cy.get('[data-test="created-date"]').contains("5. September 2019");
    cy.get('[data-test="metadata-sidebar"]').contains("Modified");
  });

});
