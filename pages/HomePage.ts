import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Locators
  private readonly searchBox = 'input[id="small-searchterms"]';
  private readonly baseUrl = 'https://demowebshop.tricentis.com/';

  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.navigateTo(this.baseUrl);
  }

  async searchForBook(bookName: string): Promise<void> {
    // Fill the search box
    await this.page.locator(this.searchBox).fill(bookName);
    
    // Press Enter to submit the search
    await this.page.locator(this.searchBox).press('Enter');
  }

  async isPageLoaded(): Promise<boolean> {
    const title = await this.getPageTitle();
    return title.includes('Demo Web Shop');
  }
}
