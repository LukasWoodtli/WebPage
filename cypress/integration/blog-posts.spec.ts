import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

describe('BlogPosts', () => {

  it('gets the metadata sidebar', function() {
    cy.visit('/blog/angular_velocity');

    cy.get('[data-test="metadata-sidebar"]').contains("Category");
    cy.get('[data-test="metadata-sidebar"]').contains("Mathematics");
    cy.get('[data-test="metadata-sidebar"]').contains("Tags");
    cy.get('[data-test="metadata-sidebar"]').contains("Robotics");
    cy.get('[data-test="metadata-sidebar"]').contains("Created");
    cy.get('[data-test="created-date"]').contains("5. September 2019");
    cy.get('[data-test="metadata-sidebar"]').contains("Modified");

    cy.get('[data-test="modified-date"]', { timeout: 15000 }).invoke('text').then(modifiedDateText => {
      //let customParseFormat = require('dayjs/plugin/customParseFormat')
      dayjs.extend(customParseFormat)

      const modifiedDate = dayjs(modifiedDateText, "D. MMMM YYYY", 'en', true).toDate();
      const createdDate = dayjs("5. September 2019", "D. MMMM YYYY", 'en', true).toDate();

      expect(modifiedDate).to.be.gte(createdDate);
    });
  });

  it("doesn't show 'Content' if TOC is empty", () => {
    cy.visit("/blog/physics_basics");
    cy.get(".document-wrapper").should("not.contain", "Content");

  });
});
