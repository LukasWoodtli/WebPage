describe('Screenshots', () => {

  const menu_items = [
    'Home',
    'Resume',
    'Skills',
    'Books',
    'Courses',
    'Projects',
    'Blog',
    'Contact'];

  before(() => {
    cy.visit('/');
  });


  /* Enable this for visual regression testing

  it('Visits each page and take screenshot', () => {
    menu_items.forEach(item => {
      cy.visit('/');
      cy.contains(item).click();
      cy.compareSnapshot(item, 0.1);
    });
  });*/
});
