import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private readonly usernameInput = '#username';
  private readonly passwordInput = '#password';
  private readonly loginButton = '#login';
  private readonly registerLink = 'a[href="Register.php"]';
  private readonly forgotPasswordLink = 'a[href="ForgotPassword.php"]';
  private readonly authErrorDiv = '.auth_error';
  private readonly usernameError = '#username_span';
  private readonly passwordError = '#password_span';

  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.navigateTo('https://adactinhotelapp.com/HotelAppBuild2');
    await this.waitForLoadState();
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async clickLoginButton(): Promise<void> {
    await this.page.click(this.loginButton);
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async clickRegisterLink(): Promise<void> {
    await this.page.click(this.registerLink);
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.page.click(this.forgotPasswordLink);
  }

  async getAuthErrorMessage(): Promise<string> {
    return await this.page.textContent(this.authErrorDiv) || '';
  }

  async isUsernameErrorVisible(): Promise<boolean> {
    try {
      const errorText = await this.page.textContent(this.usernameError);
      return errorText ? errorText.trim().length > 0 : false;
    } catch {
      return false;
    }
  }

  async isPasswordErrorVisible(): Promise<boolean> {
    try {
      const errorText = await this.page.textContent(this.passwordError);
      return errorText ? errorText.trim().length > 0 : false;
    } catch {
      return false;
    }
  }

  async isLoginPageLoaded(): Promise<boolean> {
    const title = await this.getPageTitle();
    return title.includes('Hotel Reservation System');
  }
}
