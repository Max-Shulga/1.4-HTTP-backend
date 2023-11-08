/**
 * Sends a request to the specified URL with the given method and optional body.
 * @param {string} url - The URL to send the request to.
 * @param {string} method - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE').
 * @param {object|null} body - The optional request body to include in the request.
 * @returns {Promise} - A promise that resolves to the parsed JSON response.
 * @throws {Error} - Throws an error if the response status is not OK or if there is a network error.
 */
export async function sendRequest(url, method, body = null) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "unknown error");
    }
    return data;
  } catch (error) {
    return null; //todo I couldn't think of a better way to handle a failed request.
    // throw error;
  }
}
