import { expect, test } from "@playwright/test";

test("renders the app shell", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("Meal Signal");
  await expect(page.getByRole("heading", { name: "Meal Signal" })).toBeVisible();
});
