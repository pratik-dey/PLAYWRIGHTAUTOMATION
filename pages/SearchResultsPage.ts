import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async waitForSearchResults(): Promise<void> {
    await this.page.waitForURL(/search/);
    await this.waitForLoadState();
  }

  async isBookInResults(bookName: string): Promise<boolean> {
    const pageContent = await this.page.content();
    return pageContent.includes(bookName);
  }

  async verifyBookInResults(bookName: string): Promise<void> {
    const productText = this.page.locator('body');
    await expect(productText).toContainText(bookName);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}
