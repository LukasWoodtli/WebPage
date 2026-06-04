import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { test, expect } from '@playwright/test'


test('BlogPosts: gets the metadata sidebar', async ({ page }) => {

    await page.goto('/blog/angular_velocity');

  await expect(page.getByText('Content')).toBeVisible()

    await expect(page.getByText("Category")).toBeVisible();
    await expect(page.getByText("Mathematics")).toBeVisible();
    await expect(page.getByText("Tags")).toBeVisible();
    expect(page.getByText("Robotics")).toBeDefined();
    await expect(page.getByText("Created")).toBeVisible();
    await expect(page.getByText("5. September 2019")).toBeVisible();
    await expect(page.getByText('Modified')).toBeVisible()
    await page.getByTestId('modified-date')
      .textContent().then(modifiedDateText => {
         let customParseFormat = require('dayjs/plugin/customParseFormat')
         dayjs.extend(customParseFormat)

         const modifiedDate = dayjs(modifiedDateText, "D. MMMM YYYY", 'en', true).toDate();
         const createdDate = dayjs("5. September 2019", "D. MMMM YYYY", 'en', true).toDate();

         expect(modifiedDate > createdDate).toBeTruthy()
    });
});

test("BlogPosts: doesn't show 'Content' if TOC is empty", async ({ page }) => {
  await page.goto('/blog/physics_basics')

  await expect(page.getByText('Content')).toBeHidden();
})
