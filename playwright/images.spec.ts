import { test, expect } from '@playwright/test';

test.describe('Images in markdown files', () => {

    test('check links and alt text', async ({ page }) => {
        await page.goto('/blog/language_implementation_patterns');

        const img = page.locator('img').nth(2); // nth used as array index
        await expect(img).toHaveAttribute('src', /\/one_or_more\.svg/);
        await expect(img).toHaveAttribute('alt', 'One or more');
    });
});
