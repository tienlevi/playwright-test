import { test } from "@playwright/test";

const baseLocal = "http://localhost:5173/post/1";

test("Screenshots", async ({ page }) => {
  await page.goto(baseLocal, { waitUntil: "networkidle" });

  await page.screenshot({
    path: "public/fullpage.png",
    fullPage: true,
  });
});
