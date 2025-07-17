import { test } from "@playwright/test";

const baseLocal = "http://localhost:5173";

test("Screenshots", async ({ page }) => {
  await page.goto(baseLocal, { waitUntil: "networkidle" });

  await page.locator("header").screenshot({ path: "public/lists.png" });

  await page.screenshot({
    path: "public/fullpage.png",
    fullPage: true,
  });
});
