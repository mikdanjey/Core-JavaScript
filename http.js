
import axios from 'axios';

// Function to get a new access token using the refresh token
async function getNewAccessToken() {
  try {
    const response = await axios.post('/api/refresh', { refreshToken: localStorage.getItem('refreshToken') });
    return response.data.accessToken;
  } catch (error) {
    console.error('Error getting new access token:', error);
    // Handle error, e.g., redirect to login page
    return null;
  }
}

// Axios instance with interceptors
const api = axios.create({
  baseURL: 'http://your-api-endpoint.com',
});

// Add a request interceptor to add authorization header
api.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Add a response interceptor to handle 401 Unauthorized responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Get new access token
      const newAccessToken = await getNewAccessToken();

      if (newAccessToken) {
        // Update access token in local storage
        localStorage.setItem('accessToken', newAccessToken);

        // Retry the failed request with the new access token
        return api(error.config);
      } else {
        // Handle error, e.g., redirect to login page
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

// Example usage
api.get('/protected-resource')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
content_copy
Use code with caution.
JavaScript

Explanation:

getNewAccessToken Function:

This function sends a POST request to the /api/refresh endpoint with the refresh token stored in local storage.

It expects the response to contain a new accessToken.

If successful, it returns the new access token.

If there's an error, it logs the error and returns null.

Axios Instance (api) with Interceptors:

An Axios instance is created with a base URL for the API.

Request Interceptor:

This interceptor adds the authorization header to every request using the accessToken from local storage.

Response Interceptor:

This interceptor handles 401 Unauthorized responses.

If a 401 response is received, it calls getNewAccessToken to get a new access token.

If a new access token is obtained, it updates the accessToken in local storage and retries the failed request with the new token.

If getting a new token fails, it rejects the promise with the error.

Example Usage:

The example shows how to make a request to a protected resource using the api instance.

The .then() block handles successful responses.

The .catch() block handles errors, including those related to authentication.

Important Notes:

Replace /api/refresh with your actual endpoint for refreshing access tokens.

Store the accessToken and refreshToken securely in local storage. Consider using a more secure storage mechanism like a cookie with HttpOnly flag.

Implement proper error handling and user feedback mechanisms, such as redirecting to a login page or displaying an error message.

Make sure your backend API is correctly configured to handle refresh token requests and generate new access tokens.
  
