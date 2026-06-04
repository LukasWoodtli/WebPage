import { test, expect } from '@playwright/test';

test.describe('Links in markdown files', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/linux_system_calls');
  });

  test('check external links', async ({ page }) => {
    const link = page.getByText('system calls').and(page.locator('a.MuiLink-root'));
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('href', 'http://man7.org/linux/man-pages/man2/syscalls.2.html');
  });

  test('check internal links between markdown files', async ({ page }) => {
    const link = page
      .getByText('calling convention', { exact: true })
      .and(page.locator('a.MuiTypography-root'))
    await expect(link).not.toHaveAttribute('target');
    await expect(link).toHaveAttribute('href', '/blog/intel_calling_conventions');
  });
});
