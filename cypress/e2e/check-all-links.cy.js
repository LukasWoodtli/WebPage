
function isInAllowList(href) {
  const allowList = ["linkedin", "quora", "mailto", "the-y-combinator", "buchundnetz"];
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
  if (!isInAllowList(href)) {
    cy.log(`On page: ${page}`);
    cy.log(`${text}: ${href}`);
    if (href.startsWith("/") || href.endsWith(".md")) {
      cy.visit(href);
      cy.go("back");
    }
    else {
      cy.request("HEAD", href).its("status").should("equal", 200);
    }
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

  it('checks blog pages', () => {
    const pages = [
      "/blog/scheme",
      "/blog/closure",
      "/blog/intel_architecture",
      "/blog/executable_loader",];

    pages.forEach(p => {
      visitBlogPageAndCheckLinks(p);
    });
  });

  /*it('checks every blog entry', () => {
    cy.visit("/blog");

    cy.get('a').each((el) => {

      cy.log(el.text());
      const href = el.prop('href');
      if (href.includes("/blog/")) {
        visitBlogPageAndCheckLinks(href);
      }
    });
  });*/
});
