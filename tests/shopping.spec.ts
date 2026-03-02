import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { CartPage } from '../pages/cart-page';
import { CheckoutPage } from '../pages/checkout-page';

test.beforeEach(async ({ page }) => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  loginPage     = new LoginPage(page);
  inventoryPage = new InventoryPage(page);
  cartPage      = new CartPage(page);
  checkoutPage  = new CheckoutPage(page);

  // Login ก่อนทุก Test ใน describe block นี้
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await inventoryPage.expectOnInventoryPage();
});

test('TC-S-08 | Checkout สำเร็จ — แสดงหน้า Order Complete', async ( { page } ) => {

  // 1. เพิ่มสินค้า
  await inventoryPage.addToCartByName('Sauce Labs Backpack');
  await inventoryPage.goToCart();

  // 2. เริ่ม Checkout
  await cartPage.clickCheckout();

  // 3. กรอกข้อมูล Shipping
  await checkoutPage.fillShippingInfo('สมชาย', 'ใจดี', '10110');

  // 4. ยืนยัน Order
  await checkoutPage.clickFinish();

  // ✅ ตรวจสอบผลลัพธ์ปลายทาง
  await checkoutPage.expectOnComplete();
});