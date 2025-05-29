/**
 * Web Extract Data - A JavaScript package for extracting structured data from websites.
 *
 * This package provides native functions for each endpoint of the InstantAPI.ai
 * Web Scraping API, making it easy to extract data from websites without writing
 * HTML selectors.
 */

const { WebExtractClient } = require('./src/client');

module.exports = {
  WebExtractClient,
  version: '0.1.0'
};
