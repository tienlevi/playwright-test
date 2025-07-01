import { test, expect } from "@playwright/test";

const searchItemText = "Search items...";

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
    await page.goto("http://localhost:5173");
  });
  test("Search Items", async ({ page }) => {
    await page.getByRole("button", { name: "Click Action" }).click();
    await expect(page.getByPlaceholder(searchItemText)).toBeVisible();
  });
  test("Return value", async ({ page }) => {
    await page.getAttribute("className", "filter");
  });
  // Expect a title "to contain" a substring.
});
