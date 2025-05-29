/**
 * Implementation of the /next endpoint for the Web Extract Data package.
 */
const axios = require('axios');

/**
 * Extract "Next Page" links from a paginated web page.
 * 
 * @param {string} apiKey - Your InstantAPI.ai key
 * @param {string} url - The URL of the webpage to scrape
 * @returns {Promise<Object>} A promise that resolves to the next page links
 * @throws {Error} If the API returns an error
 */
function next(apiKey, url) {
  // Prepare the endpoint and headers
  const endpoint = "https://instantapi.ai/api/next/";
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Prepare the payload
  const payload = {
    url,
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

module.exports = next;
