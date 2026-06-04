
import { test, expect } from '@playwright/test';

test.describe('TOC strings', () => {

  const pages = ["/blog", "/blog/scheme"];

  test('should not contain the string [TOC]', async ({ page }) => {
    for (const p of pages)
      await page.goto(p);
      // wait for page to be loaded
      await expect(page.getByText('Lukas Woodtli')).toBeVisible()
      await expect(page.getByText('[TOC]')).toHaveCount(0)
    })
});
