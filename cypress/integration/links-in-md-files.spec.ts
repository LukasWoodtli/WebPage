describe('Links in markdown files', () => {

    before(() => {
      cy.visit('/blog/linux_system_calls');
    });

    it('check external links', () => {
      cy.get('section > :nth-child(2) > .MuiLink-root').contains("system calls").then(($el) => {
          const message = $el.text();
          expect($el, message).to.have.attr("target").to.eq("_blank");
          expect($el, message).to.have.attr("href").to.eq("http://man7.org/linux/man-pages/man2/syscalls.2.html");
      });
    });

    it('check internal links between markdown files', () => {
        cy.get(':nth-child(5) > .MuiTypography-root').contains("calling convention").then(($el) => {
          const message = $el.text();
          expect($el, message).to.not.have.attr("target");
          expect($el, message).to.have.attr("href").to.eq("intel_calling_conventions");
        });
    });
});
