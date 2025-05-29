/**
 * Implementation of the /scrape endpoint for the Web Extract Data package.
 */
const axios = require('axios');

/**
 * Extract structured data from any webpage with a single call.
 * 
 * @param {string} apiKey - Your InstantAPI.ai key
 * @param {string} url - The URL of the webpage to scrape
 * @param {Object} fields - The fields to extract in JSON format
 * @returns {Promise<Object>} A promise that resolves to the scraped data
 * @throws {Error} If the API returns an error
 */
function scrape(apiKey, url, fields) {
  // Prepare the endpoint and headers
  const endpoint = "https://instantapi.ai/api/scrape/";
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Prepare the payload
  const payload = {
    url,
    fields,
  };

  // Make the request
  return axios.post(endpoint, payload, { headers })
    .then(response => {
      const responseData = response.data;
      
      // Determine if there was an error
      const haveError = responseData.error === true && responseData.reason !== null;
      
      // Check if the request was successful
      if (haveError) {
        throw new Error(`Error: ${responseData.reason}`);
      }
      
      // Return the response
      return responseData;
    })
    .catch(error => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(`Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error(`Network error: No response received`);
      } else {
        // Something happened in setting up the request that triggered an Error
        throw error;
      }
    });
}

module.exports = scrape;
