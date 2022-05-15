describe('MenuBar', () => {

    const initial_page_text = 'My experience range from small electromechanical devices to large scale enterprise applications.';

    const menu_items = [
      {menu_item: 'Lukas Woodtli', expected_text: initial_page_text},
      //{menu_item: 'Resume', expected_text: 'Personal Data'},
      {menu_item: 'Skills', expected_text: 'Programming Languages'},
      {menu_item: 'Books', expected_text: 'C and C++'},
      {menu_item: 'Courses', expected_text: 'Traditional Classes'},
      {menu_item: 'Projects', expected_text: 'Work Experience'},
      //{menu_item: 'Blog', expected_text: 'This blog is mainly needed for me to write down my notes.'},
      {menu_item: 'Contact', expected_text: 'Feel free to contact me'}];

    before(() => {
      cy.visit('/');
    });

    function hasButtons() {
      menu_items.forEach(element => {
        cy.contains(element.menu_item);
      });
    }

    it('Visits the initial project page', () => {
      cy.contains(initial_page_text);
      hasButtons();
    });


  it('Visits each menu button page', () => {
    menu_items.forEach(element => {
      Cypress.on('uncaught:exception', (err, runnable) => {
        cy.visit('/');
        cy.contains(element.menu_item).click();
        cy.contains(element.expected_text);
      });
    });
    hasButtons();
  });
});
