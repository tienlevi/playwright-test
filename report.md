# Demo snapshot UI khi tạo PR:

Sử dụng thư viện Playwright (là thư viện để testing web app) để kiểm thử UI, End to End, API, etc
Để output snapshot ở folder public khi lúc tạo PR comment thì sẽ lấy ảnh theo path

- File test:

* Config

```js
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Input và path file test
  testDir: "./src/tests",
  fullyParallel: true,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
  },
  webServer: {
    command: "pnpm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
```

- Example file

```js
import { test } from "@playwright/test";

const baseLocal = "http://localhost:5173";
// Page để snapshot UI
const path = "/";

test("Screenshots", async ({ page }) => {
  await page.goto(baseLocal + path, { waitUntil: "networkidle" });

  // Output snapshot file và path folder
  await page.screenshot({
    path: "public/screenshots/screenshot.png",
    fullPage: true,
  });
});
```

- Package.json:
  Config Playwright command ở package.json khi commit lên thì sẽ không phải gõ lại command để update lại snapshot
  ```js
  "test": "playwright test",
  "test:ui": "playwright test --ui"
  ```
- Workflow
  Setting Playwright CI
  Sử dụng Github Action Script version mới nhất để write workflow: https://github.com/actions/github-script
  Lấy link screenshot với https://raw.githubusercontent.com (dùng để lưu trữ files ở trong repo) với path /screenshots/screenshot.png
  VD: https://raw.githubusercontent.com/tienlevi/playwright-test/main/public/screenshots/screenshot.png
  Return message về đoạn markdown trong workflow để tạo comment trong PR
  Link workflow: https://github.com/tienlevi/playwright-test/blob/main/.github/workflows/playwright.yml
- Demo
  Link demo: https://github.com/tienlevi/playwright-test/pull/41
  Giải thích link demo: Sau khi đã init và config xong Github actions thì nó sẽ tự động tạo Comment trong PR hiện link demo và Snapshot UI (Chỉ hiển thị snapshot bằng link)
