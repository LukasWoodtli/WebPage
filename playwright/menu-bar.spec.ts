import { test, expect } from '@playwright/test';
import { Page } from 'playwright'

test.describe('MenuBar', () => {

  const initial_page_text =
    'My experience range from small electromechanical devices to large scale enterprise applications.'

  const menu_items = [
    { menu_item: 'Lukas Woodtli', expected_text: initial_page_text },
    { menu_item: 'Resume', expected_text: 'Personal Data' },
    { menu_item: 'Skills', expected_text: 'Programming Languages' },
    { menu_item: 'Books', expected_text: 'Operating Systems and Networking' },
    { menu_item: 'Courses', expected_text: 'Traditional Classes' },
    { menu_item: 'Projects', expected_text: 'Work Experience' },
    { menu_item: 'Contact', expected_text: 'Feel free to contact me' },
  ]

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  async function hasButtons(page: Page) {
    let menu_bar = page.getByText('Lukas WoodtliResumeSkillsBooksCoursesProjectsBlogContact')
    for (const element of menu_items) {
      await expect(
        menu_bar.getByText(element.menu_item, { exact: true }),
      ).toBeVisible()
    }
  }

  test('Visits the initial project page', async ({ page }) => {
    await expect(page.getByText(initial_page_text)).toBeVisible();
    await hasButtons(page);
  });

  test('Visits each menu button page', async ({ page }) => {
    for (const element of menu_items) {
      await page.goto('/');
      await page.getByText(element.menu_item, { exact: true }).click()
      await expect(
        page.getByText(element.expected_text),
      ).toBeVisible()
    }
    await hasButtons(page);
  });
});
