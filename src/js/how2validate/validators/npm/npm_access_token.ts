import axios, { AxiosError } from "axios"; // Import Axios for making HTTP requests and the AxiosError type for error handling
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
} from "../../utility/config_utility"; // Import functions to retrieve active and inactive secret statuses
import { getSecretStatusMessage } from "../../utility/log_utility"; // Import function to format status messages

/**
 * Validate an NPM access token by making an API request to check its validity.
 * @param service - The name of the service being validated (in this case, NPM).
 * @param secret - The NPM access token to validate.
 * @param response - A flag to indicate whether to include detailed response data.
 * @param report - An optional flag for additional reporting features.
 * @returns A promise that resolves to a status message about the access token validation.
 */
export async function validateNpmAccessToken(
  service: string,
  secret: string,
  response: boolean,
  report?: boolean
): Promise<string> {
  // NPM API endpoint for retrieving user information
  const url = "https://registry.npmjs.org/-/npm/v1/user";

  // Headers to prevent caching and to authorize the request using the provided token
  const nocacheHeaders = { "Cache-Control": "no-cache" };
  const headers = { Authorization: `Bearer ${secret}` };

  try {
    // Send a GET request to the NPM API to validate the access token
    const responseData = await axios.get(url, {
      headers: { ...nocacheHeaders, ...headers },
    });

    // Check if the request was successful (HTTP 200)
    if (responseData.status === 200) {
      // If no detailed response is requested, return the active status message
      if (!response) {
        return getSecretStatusMessage(
          service,
          getActiveSecretStatus() as string,
          response
        );
      } else {
        // Return the active status message along with the response data
        return getSecretStatusMessage(
          service,
          getActiveSecretStatus() as string,
          response,
          JSON.stringify(responseData.data, null, 4)
        );
      }
    } else {
      // If the response status code is not 200, handle it as an inactive token
      return handleInactiveStatus(service, response, responseData.data);
    }
  } catch (error) {
    // Handle errors that occur during the request and return the inactive status message
    return handleErrors(error, service, response);
  }
}

/**
 * Handle the case when the NPM access token is inactive or invalid.
 * @param service - The name of the service being validated (NPM).
 * @param response - A flag to indicate whether to include detailed response data.
 * @param data - Optional additional data to include in the response.
 * @returns A formatted status message indicating the inactive status.
 */
function handleInactiveStatus(
  service: string,
  response: boolean,
  data?: any
): string {
  if (!response) {
    // Return inactive status message without additional data
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response
    );
  } else {
    // Return inactive status message with additional response data
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response,
      data ? JSON.stringify(data) : "No additional data."
    );
  }
}

/**
 * Handle errors that occur during the validation process.
 * @param error - The error object that was thrown during the request.
 * @param service - The name of the service being validated (NPM).
 * @param response - A flag to indicate whether to include detailed response data.
 * @returns A formatted status message based on the type of error encountered.
 */
function handleErrors(
  error: unknown,
  service: string,
  response: boolean
): string {
  // Check if the error is an Axios error
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError; // Cast to AxiosError type
    if (!response) {
      // Return inactive status message without additional error details
      return getSecretStatusMessage(
        service,
        getInactiveSecretStatus() as string,
        response
      );
    } else {
      // Return inactive status message with error details from the response or message
      return getSecretStatusMessage(
        service,
        getInactiveSecretStatus() as string,
        response,
        axiosError.response?.data || axiosError.message
      );
    }
  }

  // Handle general errors that are not Axios errors
  if (!response) {
    // Return inactive status message without additional error details
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response
    );
  } else {
    // Return inactive status message with a general error message
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response,
      "An unexpected error occurred."
    );
  }
}
