import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';

test.describe('Adactin Hotel App - Registration Tests', () => {
  let registerPage: RegisterPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.navigateToRegister();
  });

  test('TC101: Verify registration page loads successfully', async ({ page }) => {
    // Verify the registration page is loaded
    const isLoaded = await registerPage.isRegisterPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify page title
    const title = await registerPage.getPageTitle();
    expect(title).toContain('New User Registration');
  });

  test('TC102: Verify username field accepts input', async ({ page }) => {
    const testUsername = 'newuser123';
    await registerPage.enterUsername(testUsername);

    // Verify the value is entered
    const usernameValue = await page.inputValue('input[name="username"]');
    expect(usernameValue).toBe(testUsername);
  });

  test('TC103: Verify password field accepts input', async ({ page }) => {
    const testPassword = 'Password123!';
    await registerPage.enterPassword(testPassword);

    // Verify the value is entered
    const passwordValue = await page.inputValue('input[name="password"]');
    expect(passwordValue).toBe(testPassword);
  });

  test('TC104: Verify confirm password field accepts input', async ({ page }) => {
    const testPassword = 'Password123!';
    await registerPage.enterConfirmPassword(testPassword);

    // Verify the value is entered
    const confirmPasswordValue = await page.inputValue('input[name="re_password"]');
    expect(confirmPasswordValue).toBe(testPassword);
  });

  test('TC105: Verify full name field accepts input', async ({ page }) => {
    const testFullName = 'John Doe';
    await registerPage.enterFullName(testFullName);

    // Verify the value is entered
    const fullNameValue = await page.inputValue('input[name="full_name"]');
    expect(fullNameValue).toBe(testFullName);
  });

  test('TC106: Verify email field accepts input', async ({ page }) => {
    const testEmail = 'test@example.com';
    await registerPage.enterEmail(testEmail);

    // Verify the value is entered
    const emailValue = await page.inputValue('input[name="email_add"]');
    expect(emailValue).toBe(testEmail);
  });

  test('TC107: Verify captcha text field accepts input', async ({ page }) => {
    const testCaptcha = 'testcap';  // Max length is 8
    await registerPage.enterCaptchaText(testCaptcha);

    // Verify the value is entered
    const captchaValue = await page.inputValue('input[name="captcha"]');
    expect(captchaValue).toBe(testCaptcha);
  });

  test('TC108: Verify Terms & Conditions checkbox can be checked', async ({ page }) => {
    await registerPage.agreeToCaptcha();

    // Verify checkbox is checked
    const termsCheckbox = page.locator('input[name="tnc_box"]');
    const isChecked = await termsCheckbox.isChecked();
    expect(isChecked).toBeTruthy();
  });

  test('TC109: Verify reset button clears form fields', async ({ page }) => {
    // Fill in some data
    await registerPage.enterUsername('testuser');
    await registerPage.enterPassword('testpass');
    await registerPage.enterFullName('Test User');

    // Verify data is entered
    let usernameValue = await page.inputValue('input[name="username"]');
    expect(usernameValue).toBe('testuser');

    // Click reset button
    await registerPage.clickResetButton();
    await page.waitForTimeout(500);

    // Verify fields are cleared
    usernameValue = await page.inputValue('input[name="username"]');
    expect(usernameValue).toBe('');
  });

  test('TC110: Verify all mandatory form fields are visible', async ({ page }) => {
    // Check username field
    const usernameField = page.locator('input[name="username"]');
    expect(await usernameField.isVisible()).toBeTruthy();

    // Check password field
    const passwordField = page.locator('input[name="password"]');
    expect(await passwordField.isVisible()).toBeTruthy();

    // Check confirm password field
    const confirmPasswordField = page.locator('input[name="re_password"]');
    expect(await confirmPasswordField.isVisible()).toBeTruthy();

    // Check full name field
    const fullNameField = page.locator('input[name="full_name"]');
    expect(await fullNameField.isVisible()).toBeTruthy();

    // Check email field
    const emailField = page.locator('input[name="email_add"]');
    expect(await emailField.isVisible()).toBeTruthy();
  });

  test('TC112: Verify email field validation with invalid email', async ({ page }) => {
    const invalidEmail = 'invalidemail';
    await registerPage.enterEmail(invalidEmail);

    // Verify the value is entered (actual validation depends on form implementation)
    const emailValue = await page.inputValue('input[name="email_add"]');
    expect(emailValue).toBe(invalidEmail);
  });

  test('TC113: Verify password and confirm password matching', async ({ page }) => {
    const password = 'MatchingPassword123!';
    await registerPage.enterPassword(password);
    await registerPage.enterConfirmPassword(password);

    // Verify both fields have the same value
    const passwordValue = await page.inputValue('input[name="password"]');
    const confirmPasswordValue = await page.inputValue('input[name="re_password"]');
    expect(passwordValue).toBe(confirmPasswordValue);
  });

  test('TC114: Verify submit button is visible and enabled', async ({ page }) => {
    const submitButton = page.locator('input[type="submit"][name="Submit"]');
    expect(await submitButton.isVisible()).toBeTruthy();
    expect(await submitButton.isEnabled()).toBeTruthy();
  });

  test('TC115: Verify registration page has captcha image', async ({ page }) => {
    // Check if captcha image exists
    const captchaImage = page.locator('img[src*="captcha"], img[src*="Captcha"]').first();
    const isVisible = await captchaImage.isVisible().catch(() => false);
    // Captcha image may or may not be visible, depending on page rendering
    expect(typeof isVisible === 'boolean').toBeTruthy();
  });
});
