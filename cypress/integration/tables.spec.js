describe('Check tables on Resume', () => {

  it('should find 4 tables', () => {
    cy.visit('/resume');
    let tables = cy.get('[class=mat-table]');
    tables.should('have.length', 4);
  });
  it('Check first table header row', () => {
    cy.visit('/resume');
    let tables = cy.get('[class=mat-table]');
    tables.first().find('div')
      .first()
      .should('have.class', 'mat-header-row');
  });

  it('Check first table other rows', () => {
    cy.visit('/resume');
    let tables = cy.get('[class=mat-table]');
    tables.first()
      .find('[class=mat-row]')
      .should('have.length.at.least', 1);
  });
});
