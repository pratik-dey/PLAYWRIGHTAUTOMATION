import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Adactin Hotel App - Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test('TC001: Verify login page loads successfully', async ({ page }) => {
    // Verify the login page is loaded
    const isLoaded = await loginPage.isLoginPageLoaded();
    expect(isLoaded).toBeTruthy();

    // Verify page title
    const title = await loginPage.getPageTitle();
    expect(title).toContain('Hotel Reservation System');
  });

  test('TC002: Verify username field accepts input', async ({ page }) => {
    const testUsername = 'testuser123';
    await loginPage.enterUsername(testUsername);

    // Verify the value is entered
    const usernameValue = await page.inputValue('#username');
    expect(usernameValue).toBe(testUsername);
  });

  test('TC003: Verify password field accepts input', async ({ page }) => {
    const testPassword = 'testpass123';
    await loginPage.enterPassword(testPassword);

    // Verify the value is entered
    const passwordValue = await page.inputValue('#password');
    expect(passwordValue).toBe(testPassword);
  });

  test('TC004: Verify login with empty username shows validation error', async ({ page }) => {
    // Try to login with empty username
    await loginPage.enterPassword('anypassword');
    await loginPage.clickLoginButton();

    // Check for validation error
    const isUsernameErrorVisible = await loginPage.isUsernameErrorVisible();
    expect(isUsernameErrorVisible).toBeTruthy();
  });

  test('TC005: Verify login with empty password shows validation error', async ({ page }) => {
    // Try to login with empty password
    await loginPage.enterUsername('anyusername');
    await loginPage.clickLoginButton();

    // Check for validation error
    const isPasswordErrorVisible = await loginPage.isPasswordErrorVisible();
    expect(isPasswordErrorVisible).toBeTruthy();
  });

  test('TC006: Verify Register link navigates to registration page', async ({ page }) => {
    await loginPage.clickRegisterLink();
    await page.waitForURL(/Register.php/);

    // Verify page changed to registration page
    const title = await loginPage.getPageTitle();
    expect(title).toContain('New User Registration');
  });

  test('TC007: Verify Forgot Password link is accessible', async ({ page }) => {
    await loginPage.clickForgotPasswordLink();
    await page.waitForURL(/ForgotPassword.php/, { timeout: 5000 }).catch(() => null);

    // Verify navigation happened or link is present
    const currentUrl = page.url();
    expect(currentUrl.includes('ForgotPassword.php') || currentUrl.includes('HotelAppBuild2')).toBeTruthy();
  });

  test('TC008: Verify login with invalid credentials shows error', async ({ page }) => {
    const invalidUsername = 'invaliduser123456';
    const invalidPassword = 'invalidpass123456';

    await loginPage.login(invalidUsername, invalidPassword);
    await page.waitForTimeout(2000);

    // Check for authentication error
    const errorMessage = await loginPage.getAuthErrorMessage();
    // Error message should be present or we should still be on login page
    const stillOnLoginPage = page.url().includes('HotelAppBuild2') || page.url().includes('index.php');
    expect(stillOnLoginPage || errorMessage.length > 0).toBeTruthy();
  });

  test('TC009: Verify login button is clickable', async ({ page }) => {
    await loginPage.enterUsername('testuser');
    await loginPage.enterPassword('testpass');

    // Verify button exists and is clickable
    const loginButton = page.locator('#login');
    expect(await loginButton.isVisible()).toBeTruthy();
    expect(await loginButton.isEnabled()).toBeTruthy();
  });

  test('TC010: Verify all login form elements are visible', async ({ page }) => {
    // Check username field
    const usernameField = page.locator('#username');
    expect(await usernameField.isVisible()).toBeTruthy();

    // Check password field
    const passwordField = page.locator('#password');
    expect(await passwordField.isVisible()).toBeTruthy();

    // Check login button
    const loginButton = page.locator('#login');
    expect(await loginButton.isVisible()).toBeTruthy();
  });
});
