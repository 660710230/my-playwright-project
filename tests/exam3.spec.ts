import { test, expect } from '@playwright/test';

test('error test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('1234');
    await page.locator('[data-test="login-button"]').click();

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('do not match');
    await expect(page.getByPlaceholder('Username')).toHaveClass(/error/);

    await page.locator('[data-test="error-button"]').click();
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
});

test('dropdown', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

  const sortDropdown = page.locator('[data-test="product-sort-container"]');
    await expect(sortDropdown).toBeVisible();
    await sortDropdown.selectOption('lohi');
});

