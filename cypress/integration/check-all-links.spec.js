
function isInAllowList(href) {
  const allowList = ["linkedin", "quora", "mailto"];
  for (let i = 0; i < allowList.length; i++) {
    if (href.includes(allowList[i])) {
      return true;
    }
  }
  return false;
}

function testLinksOnPage(el, page) {
  const text = el.text();
  const href = el.prop('href')
  if (href.endsWith(".zip")) {
    cy.log("Zip Files not yet provided!!!");
    console.warn("Zip files!!!");
  } else if (!isInAllowList(href)) {
    cy.log(`On page: ${page}`);
    cy.log(`${text}: ${href}`);
    cy.request("HEAD", href).its("status").should("equal", 200);
  }
}

function visitStaticPageAndCheckLinks(page) {
  cy.visit(page);
  cy.get("a").each((el) => {
    testLinksOnPage(el, page);
  });
}

function visitBlogPageAndCheckLinks(page) {
  if (!page.includes("/blog")) {
    cy.log("NOT A BLOG PAGE!");
  }
  cy.visit(page);
  cy.get('[data-test="blog-page-content"]').get("a").each((el) => {
    testLinksOnPage(el, page);
  });
}

describe('Links on all pages are valid', () => {
  const staticPages = [
    "/",
    "/resume",
    "/skills",
    "/books",
    "/courses",
    "/projects",
    "/contact",
    "/recruiters_headhunters"];

  it('checks static pages', () => {
    staticPages.forEach((page) => {
      visitStaticPageAndCheckLinks(page);
    });
  });

/*  it('checks a single blog page', () => {
    visitBlogPageAndCheckLinks("/blog/linux_system_calls");
  });
*/
  /*it('checks every blog entry', () => {
    cy.visit("/blog");

    cy.get('a').each((el) => {

      cy.log(el.text());
      const href = el.prop('href');
      if (href.includes("/blog/")) {
        visitPageAndCheckLinks(href);
      }
    });
  });*/
});
