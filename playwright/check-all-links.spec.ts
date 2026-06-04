/* These tests don't run reliably. They can be run manually when needed.
import { test, expect, Page, APIRequestContext } from '@playwright/test';

function isInAllowList(href: string): boolean {
  const allowList = [
    '365careers',
    'acm',
    'dormakaba',
    'gardena',
    'github',
    'linkedin',
    'oreilly',
    'packtpub',
    'quora',
    'udacity',
    'mailto',
    'the-y-combinator',
    'buchundnetz',
    'intel',
    'stackoverflow',
  ]
  return allowList.some(item => href.includes(item));
}


export interface Link {
  href: string;
  text: string;
}

export async function getAllLinks(page: Page): Promise<Link[]> {
  const links = await page.locator('a').evaluateAll((elements) => {
    return (elements as HTMLAnchorElement[]).map((el) => ({
      href: el.href,
      text: el.textContent || '',
    }));
  });
  return links;
}

async function testLinksOnPage(page: Page, request: APIRequestContext, href: string, text: string, sourcePage: string) {
  if (!href || isInAllowList(href)) return;

  console.log(`On page: ${sourcePage}`);
  console.log(`${text}: ${href}`);

  if (href.startsWith('/') || href.endsWith('.md')) {
    await page.goto(href);
    await page.goBack();
  } else if (href.startsWith('http')) {
    const response = await request.head(href);
    expect(response.status()).toBe(200);
  }
}

async function visitStaticPageAndCheckLinks(page: Page, request: APIRequestContext, sourcePage: string) {
  await page.goto(sourcePage);
  let links = await getAllLinks(page);
  for (const link of links) {
    await testLinksOnPage(page, request, link.href, link.text, sourcePage);
  }
}

async function visitBlogPageAndCheckLinks(page: Page, request: APIRequestContext, sourcePage: string) {
  if (!sourcePage.includes('/blog')) {
    console.log('NOT A BLOG PAGE!');
  }
  await page.goto(sourcePage);
  const links = await page.locator('[data-test="blog-page-content"] a').all();
  for (const link of links) {
    const href = (await link.getAttribute('href')) ?? '';
    const text = (await link.textContent()) ?? '';
    await testLinksOnPage(page, request, href, text, sourcePage);
  }
}

test.describe('Links on all pages are valid', () => {
  const staticPages = [
    '/',
    '/resume',
    '/skills',
    '/books',
    '/courses',
    '/projects',
    '/contact',
    '/recruiters_headhunters',
  ];


  test('checks static pages', async ({ page, request }) => {
    for (const p of staticPages) {
      await visitStaticPageAndCheckLinks(page, request, p);
    }
  });


  test('checks blog pages', async ({ page, request }) => {
    const pages = [
      '/blog/closure',
      '/blog/intel_architecture',
      '/blog/executable_loader',
    ];
    for (const p of pages) {
      await visitBlogPageAndCheckLinks(page, request, p);
    }
  });

  test('checks every blog entry', async ({ page, request }) => {
    await page.goto('/blog');
    const links = await page.locator('a').all();
    const blogHrefs: string[] = [];
    for (const link of links) {
      const href = (await link.getAttribute('href')) ?? '';
      if (href.includes('/blog/')) {
        blogHrefs.push(href);
      }
    }
    for (const href of blogHrefs) {
      await visitBlogPageAndCheckLinks(page, request, href);
    }
  });
});
*/
