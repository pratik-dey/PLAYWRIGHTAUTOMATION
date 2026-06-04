import { test, expect } from '@playwright/test';

test('Search for Computing and Internet book and verify it in the list', async ({ page }) => {
  // Step 1: Navigate to https://demowebshop.tricentis.com/
  await page.goto('https://demowebshop.tricentis.com/');
  
  // Verify the page has loaded
  await expect(page).toHaveTitle(/Demo Web Shop/);

  // Step 2: Search for "Computing and Internet" book
  // Fill the search box with the book name
  const searchBox = page.locator('input[id="small-searchterms"]');
  await searchBox.fill('Computing and Internet');
  
  // Press Enter to submit the search
  await searchBox.press('Enter');
  
  // Wait for the search results page to load
  await page.waitForURL(/search/);
  await page.waitForLoadState('networkidle');

  // Step 3: Verify the "Computing and Internet" book is in the list
  // Check that the page contains "Computing and Internet"
  const pageContent = await page.content();
  expect(pageContent).toContain('Computing and Internet');
  
  // More specific verification - check that the product link/text exists
  const productText = page.locator('body');
  await expect(productText).toContainText('Computing and Internet');
});
