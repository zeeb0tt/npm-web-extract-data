/**
 * WebExtractClient - Main client class for the Web Extract Data package.
 */
const scrape = require('./endpoints/scrape');
const links = require('./endpoints/links');
const next = require('./endpoints/next');
const search = require('./endpoints/search');

class WebExtractClient {
  /**
   * Client for extracting structured data from websites using the InstantAPI.ai Web Scraping API.
   * 
   * This client provides native functions for each endpoint of the InstantAPI.ai Web Scraping API,
   * making it easy to extract data from websites without writing HTML selectors.
   */
  
  /**
   * Initialize the WebExtractClient with your API key.
   * 
   * @param {string} apiKey - Your InstantAPI.ai key
   * @throws {Error} If the API key is empty or still has the default placeholder
   */
  constructor(apiKey) {
    if (!apiKey || apiKey.trim() === "" || apiKey.includes("%%API_KEY%%")) {
      throw new Error(
        "Please provide a valid InstantAPI.ai API key. " +
        "You can get your API key from: https://web.instantapi.ai/#pricing-03-254921"
      );
    }
    
    this.apiKey = apiKey;
  }
  
  /**
   * Extract structured data from any webpage with a single call.
   * 
   * @param {Object} params - The parameters for the scrape endpoint
   * @param {string} params.url - The URL of the webpage to scrape
   * @param {Object} params.fields - The fields to extract in JSON format
   * @returns {Promise<Object>} A promise that resolves to the scraped data
   */
  scrape({ url, fields }) {
    return scrape(this.apiKey, url, fields);
  }
  
  /**
   * Find all links on a page that match a specific description.
   * 
   * @param {Object} params - The parameters for the links endpoint
   * @param {string} params.url - The URL of the webpage to scrape
   * @param {string} params.description - Description of the links to extract
   * @returns {Promise<Object>} A promise that resolves to the extracted links
   */
  links({ url, description }) {
    return links(this.apiKey, url, description);
  }
  
  /**
   * Extract "Next Page" links from a paginated web page.
   * 
   * @param {Object} params - The parameters for the next endpoint
   * @param {string} params.url - The URL of the webpage to scrape
   * @returns {Promise<Object>} A promise that resolves to the next page links
   */
  next({ url }) {
    return next(this.apiKey, url);
  }
  
  /**
   * Scrape and extract relevant Google search result URLs.
   * 
   * @param {Object} params - The parameters for the search endpoint
   * @param {string} params.query - The search query
   * @param {string} [params.googleDomain="www.google.com"] - The Google domain to search on
   * @param {number} [params.page=1] - The page number to scrape
   * @returns {Promise<Object>} A promise that resolves to the search results
   */
  search({ query, googleDomain = "www.google.com", page = 1 }) {
    return search(this.apiKey, query, googleDomain, page);
  }
}

module.exports = { WebExtractClient };
