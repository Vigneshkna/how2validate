import axios, { AxiosError } from "axios"; // Import Axios for making HTTP requests and AxiosError for error handling
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
} from "../../utility/config_utility"; // Import functions to get secret statuses
import { getSecretStatusMessage } from "../../utility/log_utility"; // Import function to format status messages

/**
 * Validate a SonarCloud token by making an API request to check its validity.
 * @param service - The name of the service being validated.
 * @param secret - The token or secret to validate.
 * @param response - A flag to indicate whether to include detailed response data.
 * @param report - An optional flag for additional reporting features.
 * @returns A promise that resolves to a status message about the token validation.
 */
export async function validateSonarcloudToken(
  service: string,
  secret: string,
  response: boolean,
  report?: boolean
): Promise<string> {
  const url = "https://sonarcloud.io/api/users/current"; // API endpoint for SonarCloud user information
  const nocacheHeaders = { "Cache-Control": "no-cache" }; // Header to prevent caching
  const headers = { Authorization: `Bearer ${secret}` }; // Authorization header with the Bearer token

  try {
    // Make the API request to validate the token
    const responseData = await axios.get(url, {
      headers: { ...nocacheHeaders, ...headers }, // Combine headers
    });

    // Check if the request was successful
    if (responseData.status === 200) {
      // If successful and no detailed response is requested
      if (!response) {
        return getSecretStatusMessage(
          service,
          getActiveSecretStatus() as string,
          response
        );
      } else {
        // If successful and detailed response is requested
        return getSecretStatusMessage(
          service,
          getActiveSecretStatus() as string,
          response,
          JSON.stringify(responseData.data, null, 4)
        );
      }
    } else {
      // Handle non-successful status codes
      return handleInactiveStatus(service, response, responseData.data);
    }
  } catch (error) {
    // Handle errors that occur during the request
    return handleErrors(error, service, response);
  }
}

/**
 * Handle the case when the token is inactive or invalid.
 * @param service - The name of the service being validated.
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
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response
    );
  } else {
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
 * @param error - The error object that was thrown.
 * @param service - The name of the service being validated.
 * @param response - A flag to indicate whether to include detailed response data.
 * @returns A formatted status message based on the type of error.
 */
function handleErrors(
  error: unknown,
  service: string,
  response: boolean
): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError; // Cast error to AxiosError for more specific handling
    if (!response) {
      return getSecretStatusMessage(
        service,
        getInactiveSecretStatus() as string,
        response
      );
    } else {
      // Include detailed error information in the response
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
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response
    );
  } else {
    return getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      response,
      "An unexpected error occurred."
    );
  }
}
