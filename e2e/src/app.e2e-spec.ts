import {browser, logging, element, by } from 'protractor';
import { AppPage } from './app.po';
var approvals = require('approvals');


describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  beforeEach(async () => {
    await page.navigateTo();
  });

  it('should display welcome message', async () => {
    expect(await page.getTitleText()).toEqual('Lukas Woodtli');
  });

  it('should approve a print-screen', async () => {
    const pagesToNavigate = ['index',
                            'resume',
                            'books',
                            'courses',
                            'projects',
                            'blog',
                            'contact'];


    for (const p of pagesToNavigate) {
      await page.navigateToPage(p);

      browser.driver.manage().window().setSize(1200, 710);
      browser.takeScreenshot().then((png) => {
        const buffer = Buffer.from(png, 'base64');
        const dirname = require('path').join(__dirname, './approval-files');
        approvals.verify(dirname, p + '-approval-test', buffer);
      });
    }
  });

  /*
    it('should approve a print-screen', async () => {
    const id = 'index-button-id';
    await page.navigateWithToolbarButton(id);

      let EC = browser.ExpectedConditions;
          const textOnPage = element(by.cssContainingText('*', 'Personal Data'));
      browser.wait(EC.visibilityOf(textOnPage),
        2000, 'waiting for page to appear');
    */


  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
