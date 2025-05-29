/**
 * Implementation of the /search endpoint for the Web Extract Data package.
 */
const axios = require('axios');

/**
 * Scrape and extract relevant Google search result URLs.
 * 
 * @param {string} apiKey - Your InstantAPI.ai key
 * @param {string} query - The search query
 * @param {string} [googleDomain="www.google.com"] - The Google domain to search on
 * @param {number} [page=1] - The page number to scrape
 * @returns {Promise<Object>} A promise that resolves to the search results
 * @throws {Error} If the API returns an error
 */
function search(apiKey, query, googleDomain = "www.google.com", page = 1) {
  // Prepare the endpoint and headers
  const endpoint = "https://instantapi.ai/api/search/";
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Prepare the payload
  const payload = {
    query,
    google_domain: googleDomain,
    page,
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

module.exports = search;
