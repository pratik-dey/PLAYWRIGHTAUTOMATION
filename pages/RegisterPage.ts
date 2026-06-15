import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  // Locators
  private readonly usernameInput = 'input[name="username"]';
  private readonly passwordInput = 'input[name="password"]';
  private readonly confirmPasswordInput = 'input[name="re_password"]';
  private readonly fullNameInput = 'input[name="full_name"]';
  private readonly emailInput = 'input[name="email_add"]';
  private readonly captchaTextInput = 'input[name="captcha"]';
  private readonly termsCheckbox = 'input[name="tnc_box"]';
  private readonly submitButton = 'input[type="submit"][name="Submit"]';
  private readonly resetButton = 'input[type="reset"]';

  constructor(page: Page) {
    super(page);
  }

  async navigateToRegister(): Promise<void> {
    await this.navigateTo('https://adactinhotelapp.com/HotelAppBuild2/Register.php');
    await this.waitForLoadState();
  }

  async enterUsername(username: string): Promise<void> {
    await this.page.fill(this.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.passwordInput, password);
  }

  async enterConfirmPassword(confirmPassword: string): Promise<void> {
    await this.page.fill(this.confirmPasswordInput, confirmPassword);
  }

  async enterFullName(fullName: string): Promise<void> {
    await this.page.fill(this.fullNameInput, fullName);
  }

  async enterEmail(email: string): Promise<void> {
    await this.page.fill(this.emailInput, email);
  }

  async enterCaptchaText(captchaText: string): Promise<void> {
    await this.page.fill(this.captchaTextInput, captchaText);
  }

  async agreeToCaptcha(): Promise<void> {
    await this.page.check(this.termsCheckbox);
  }

  async clickSubmitButton(): Promise<void> {
    await this.page.click(this.submitButton);
  }

  async clickResetButton(): Promise<void> {
    await this.page.click(this.resetButton);
  }

  async registerUser(
    username: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    email: string,
    captchaText: string
  ): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    await this.enterFullName(fullName);
    await this.enterEmail(email);
    await this.enterCaptchaText(captchaText);
    await this.agreeToCaptcha();
    await this.clickSubmitButton();
  }

  async isRegisterPageLoaded(): Promise<boolean> {
    const title = await this.getPageTitle();
    return title.includes('New User Registration');
  }
}
