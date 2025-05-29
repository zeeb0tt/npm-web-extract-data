/**
 * Example script demonstrating how to use the web-extract-data package.
 */
const { WebExtractClient } = require('./index');

// Initialize the client with your InstantAPI.ai key
// Replace %% API_KEY %% with your API key from:
// https://web.instantapi.ai/#pricing-03-254921

const client = new WebExtractClient("%%API_KEY%%");

/**
 * Example of using the scrape endpoint.
 */
async function exampleScrape() {
  console.log("\n--- SCRAPE ENDPOINT EXAMPLE ---");
  
  try {
    // Extract monitor details from Amazon
    const result = await client.scrape({
      url: "https://www.amazon.com.au/MSI-PRO-MP341CQW-UltraWide-Compatible/dp/B09Y19TRQ2",
      fields: {
        "monitor_name": "< The product name of the monitor. >",
        "brand": "< The brand or manufacturer name. >",
        "display_size_in_inches": "< Numeric only. >",
        "resolution": "< Example format: 1920x1080. >",
        "panel_type": "< Type of panel. >",
        "refresh_rate_hz": "< Numeric only. >",
        "aspect_ratio": "< Example format: 16:9. >",
        "ports": "< A comma-delimited list of available ports (e.g., HDMI, DisplayPort, etc.). >",
        "features": "< Key selling points or capabilities, comma-delimited (e.g., LED, Full HD, etc.). >",
        "price": "< Numeric price (integer or float). >",
        "price_currency": "< Price currency (3 character alphabetic ISO 4217). >",
        "review_count": "< Total number of customer reviews, numeric only. >",
        "average_rating": "< Float or numeric star rating (e.g., 4.3). >",
        "review_summary": "< A 50 words or less summary of all the written customer feedback. >"
      }
    });
    
    console.log("Scrape Result:", JSON.stringify(result.scrape, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Example of using the links endpoint.
 */
async function exampleLinks() {
  console.log("\n--- LINKS ENDPOINT EXAMPLE ---");
  
  try {
    // Extract product links from IKEA
    const result = await client.links({
      url: "https://www.ikea.com/au/en/cat/quilt-cover-sets-10680/?page=1",
      description: "individual product urls"
    });
    
    console.log("Links Result:", JSON.stringify(result.links, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Example of using the next endpoint.
 */
async function exampleNext() {
  console.log("\n--- NEXT ENDPOINT EXAMPLE ---");
  
  try {
    // Extract next page links from IKEA
    const result = await client.next({
      url: "https://www.ikea.com/au/en/cat/quilt-cover-sets-10680/"
    });
    
    console.log("Next Page Result:", JSON.stringify(result.next, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Example of using the search endpoint.
 */
async function exampleSearch() {
  console.log("\n--- SEARCH ENDPOINT EXAMPLE ---");
  
  try {
    // Search for a product on Google
    const result = await client.search({
      query: "AVID POWER 20V MAX Lithium Ion Cordless Drill Set",
      googleDomain: "www.google.com",
      page: 1
    });
    
    console.log("Search Result:", JSON.stringify(result.search, null, 2));
  } catch (error) {
    console.error("Error:", error.message);
  }
}

/**
 * Run all examples.
 */
async function runExamples() {
  console.log("Web Extract Data - Usage Examples");
  console.log("=================================");
  console.log("Replace %% API_KEY %% with your API key before running.");
  console.log("Get your API key from: https://web.instantapi.ai/#pricing-03-254921");
  
  // Comment out examples you don't want to run
  await exampleScrape();
  await exampleLinks();
  await exampleNext();
  await exampleSearch();
}

// Run the examples
runExamples().catch(console.error);
