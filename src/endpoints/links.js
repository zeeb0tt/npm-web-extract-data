/**
 * Implementation of the /links endpoint for the Web Extract Data package.
 */
const axios = require('axios');

/**
 * Find all links on a page that match a specific description.
 * 
 * @param {string} apiKey - Your InstantAPI.ai key
 * @param {string} url - The URL of the webpage to scrape
 * @param {string} description - Description of the links to extract
 * @returns {Promise<Object>} A promise that resolves to the extracted links
 * @throws {Error} If the API returns an error
 */
function links(apiKey, url, description) {
  // Prepare the endpoint and headers
  const endpoint = "https://instantapi.ai/api/links/";
  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  // Prepare the payload
  const payload = {
    url,
    description,
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

module.exports = links;
