import { Page, Locator, expect } from '@playwright/test';  // ✅

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  // ✅ เพิ่ม cancelButton — ใช้ใน TC-S-17
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly completeHeader: Locator;

  constructor(page: Page) {
    this.page             = page;
    this.firstNameInput   =
      page.getByPlaceholder('First Name');
    this.lastNameInput    =
      page.getByPlaceholder('Last Name');
    this.postalCodeInput  =
      page.getByPlaceholder('Zip/Postal Code');
    this.continueButton   =
      page.getByRole('button',{ name:'Continue' });
    this.finishButton     =
      page.getByRole('button',{ name:'Finish' });
    this.cancelButton     =
      page.getByRole('button',{ name:'Cancel' });
    this.errorMessage     =
      page.locator('[data-test="error"]');
    this.completeHeader   =
      page.locator('.complete-header');
  }

  async fillShippingInfo(
      first: string,
      last: string,
      zip: string) {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  // ✅ เพิ่ม clickContinue() — ใช้ใน TC-S-13
  async clickContinue() {
    await this.continueButton.click();
  }

  // ✅ เพิ่ม clickFinish() — ใช้ใน TC-S-08
  async clickFinish() {
    await this.finishButton.click();
  }

  // ✅ เพิ่ม clickCancel() — ใช้ใน TC-S-17
  async clickCancel() {
    await this.cancelButton.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }

  async expectOnComplete() {
    await expect(this.completeHeader)
      .toHaveText('Thank you for your order!');
  }
}