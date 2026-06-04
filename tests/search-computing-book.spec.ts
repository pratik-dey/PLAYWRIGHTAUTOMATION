import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';

test('Search for Computing and Internet book and verify it in the list', async ({ page }) => {
  const bookName = 'Computing and Internet';
  
  // Step 1: Navigate to https://demowebshop.tricentis.com/
  const homePage = new HomePage(page);
  await homePage.navigateToHome();
  
  // Verify the home page has loaded
  const isLoaded = await homePage.isPageLoaded();
  expect(isLoaded).toBeTruthy();

  // Step 2: Search for "Computing and Internet" book
  await homePage.searchForBook(bookName);
  
  // Step 3: Verify the "Computing and Internet" book is in the list
  const searchResultsPage = new SearchResultsPage(page);
  await searchResultsPage.waitForSearchResults();
  
  // Verify the book is present in the results
  const bookExists = await searchResultsPage.isBookInResults(bookName);
  expect(bookExists).toBeTruthy();
  
  // More specific verification - check that the product link/text exists
  await searchResultsPage.verifyBookInResults(bookName);
});
