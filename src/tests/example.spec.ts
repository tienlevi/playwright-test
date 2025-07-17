import { test, expect } from "@playwright/test";

const baseLocal = "http://localhost:5173";

test("Visual regression tests", async ({ page }) => {
  await page.goto(baseLocal, { waitUntil: "networkidle" });

  // Test full page screenshot with automatic snapshot comparison
  await expect(page).toHaveScreenshot("fullpage.png", {
    fullPage: true,
  });
});
