import { test, expect } from '@playwright/test';

test('filter', async ({ page }) => {
    await page.goto('https://www.saucedemo.com');

    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack' })
      .getByRole('button', { name: 'Add to cart' })
      .click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Bike Light' })
      .getByRole('button', { name: 'Add to cart' })
      .click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

