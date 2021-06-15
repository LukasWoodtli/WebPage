import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  async navigateToPage(page: string): Promise<unknown> {
    return browser.get(browser.baseUrl + "/" + page);
  }

  async getTitleText(): Promise<string> {
    return element(by.id('page-title-button-id')).getText();
  }

  async navigateWithToolbarButton(buttonId: string): Promise<any> {
    await element(by.id(buttonId)).click()

    await browser.sleep(2000);

    await browser.waitForAngular();

    let EC = browser.ExpectedConditions;

    const dialogTitle = element(by.tagName("h1"));
    browser.wait(EC.visibilityOf(dialogTitle),
      1000, 'waiting for page to appear');

    browser.refresh();
  }
}
