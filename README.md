# Web Extract Data

A JavaScript package for extracting structured data from websites without writing a single HTML selector.

Web Extract Data provides native functions for each endpoint of the InstantAPI.ai Web Scraping API, making it easy to extract data from websites, find links, navigate through pagination, and scrape Google Search results.

## Installation

```bash
npm install web-extract-data
```

## Quick Start

```javascript
const { WebExtractClient } = require('web-extract-data');

// Initialize the client with your InstantAPI.ai key
// Replace %% API_KEY %% with your API key from:
// https://web.instantapi.ai/#pricing-03-254921

const client = new WebExtractClient("%%API_KEY%%");

// You can modify the URL and data fields to extract in JSON format
client.scrape({
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
})
.then(result => {
  // Print the extracted data
  console.log(result);
})
.catch(error => {
  console.error("Error:", error.message);
});
```

## API Reference

### WebExtractClient

The main client class for interacting with the InstantAPI.ai Web Scraping API.

```javascript
const client = new WebExtractClient(apiKey);
```

- `apiKey` (string): Your InstantAPI.ai key.

### Scrape Endpoint

Extract structured data from any webpage.

```javascript
client.scrape({ url, fields })
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

- `url` (string): The URL of the webpage to scrape.
- `fields` (object): The data fields to extract in JSON format.

Example:

```javascript
client.scrape({
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
})
.then(result => console.log(result))
.catch(error => console.error(error));
```

### Links Endpoint

Find all links on a page that match a specific description.

```javascript
client.links({ url, description })
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

- `url` (string): The URL of the webpage to scrape.
- `description` (string): Description of the links to extract.

Example:

```javascript
client.links({
  url: "https://www.ikea.com/au/en/cat/quilt-cover-sets-10680/?page=3",
  description: "individual product urls"
})
.then(result => console.log(result))
.catch(error => console.error(error));
```

### Next Page Endpoint

Extract "Next Page" links from a paginated web page.

```javascript
client.next({ url })
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

- `url` (string): The URL of the webpage to scrape.

Example:

```javascript
client.next({
  url: "https://www.ikea.com/au/en/cat/quilt-cover-sets-10680/"
})
.then(result => console.log(result))
.catch(error => console.error(error));
```

### Search Endpoint

Scrape and extract relevant Google search result URLs.

```javascript
client.search({ query, googleDomain, page })
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

- `query` (string): The search query.
- `googleDomain` (string, optional): The Google domain to search on. Defaults to "www.google.com".
- `page` (number, optional): The page number to scrape. Defaults to 1.

Example:

```javascript
client.search({
  query: "AVID POWER 20V MAX Lithium Ion Cordless Drill Set",
  googleDomain: "www.google.com",
  page: 1
})
.then(result => console.log(result))
.catch(error => console.error(error));
```

## Error Handling

The package will throw errors if the API returns an error. You can handle these errors with a try-catch block or the Promise catch method:

```javascript
client.scrape({
  url: "https://example.com",
  fields: { "title": "< The title of the page. >" }
})
.then(result => {
  console.log(result);
})
.catch(error => {
  console.error("An error occurred:", error.message);
});
```

Using async/await:

```javascript
async function getData() {
  try {
    const result = await client.scrape({
      url: "https://example.com",
      fields: { "title": "< The title of the page. >" }
    });
    console.log(result);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

getData();
```

## Need Help?

Join the [Discord Community](https://discord.gg/pZEJMCTzA3) for real-time help and feedback.

## License

[MIT](LICENSE)
