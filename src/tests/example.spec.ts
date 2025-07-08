import { test, expect } from "@playwright/test";
import { apiUrl } from "../constants";

const baseLocal = "http://localhost:5173";
const baseURL = "https://playwright-test-flax.vercel.app";

test("Screenshots", async ({ page, request }) => {
  // First fetch API data
  const response = await request.get(`${apiUrl}/posts`);
  expect(response.ok()).toBeTruthy();

  // Navigate to the page
  await page.goto(baseLocal);

  // Wait for the posts to be visible
  const listsLocator = page.locator(".lists");
  await expect(listsLocator).toBeVisible({ timeout: 10000 });

  // Verify posts are rendered
  const listItems = page.locator('[role="listitem"]');
  await expect(listItems.first()).toBeVisible();

  // Take screenshot with rendered UI
  await page.screenshot({
    path: "public/fullpage.png",
    fullPage: true,
  });
});

test("page should have title", async ({ page }) => {
  await page.goto(baseURL);
  const title = await page.title();
  expect(title).toBeTruthy();
});
