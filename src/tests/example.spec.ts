import { test, expect } from "@playwright/test";

const searchItemText = "Search items...";
const baseURL = "https://playwright-test-flax.vercel.app";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    2;
    await page.goto(baseURL);
  });
  test("Search Items", async ({ page }) => {
    await page.getByRole("button", { name: "Click Action" }).click();
    await expect(page.getByPlaceholder(searchItemText)).toBeVisible();
  });
  test("Return value", async ({ page }) => {
    const className = await page.locator(".filter").getAttribute("class");
    expect(className).toBeDefined();
  });
  // Expect a title "to contain" a substring.
});

test("Screenshots", async ({ page }) => {
  await page.goto(baseURL);
  await page.screenshot({ path: "tests/images/fullpage.png", fullPage: true });
});

test('page should have title of "Dogs security blog"', async ({ page }) => {
  await page.goto(baseURL);
  const title = await page.title();
  expect(title);
});
