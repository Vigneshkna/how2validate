import * as fs from "fs"; // Import the file system module for file operations
import * as path from "path"; // Import the path module for handling file paths
import axios from "axios"; // Import Axios for making HTTP requests
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
} from "../../utility/config_utility"; // Import functions to get secret statuses
import { getSecretStatusMessage } from "../../utility/log_utility"; // Import function to format status messages

/**
 * Validate a Snyk authentication key by making an API request to check its validity.
 * @param service - The name of the service being validated.
 * @param secret - The Snyk API key (token) to validate.
 * @param response - A flag to indicate whether to include detailed response data.
 * @param report - An optional flag for additional reporting features.
 * @returns A promise that resolves to a status message about the authentication key validation.
 */
export async function validateSnykAuthKey(
  service: string,
  secret: string,
  response: boolean,
  report?: boolean
): Promise<string> {
  // Snyk API endpoint for retrieving user information
  const url = "https://snyk.io/api/v1/user";

  // Headers to prevent caching and authorize the request using the provided API key (token)
  const headers = {
    "Cache-Control": "no-cache",
    Authorization: `token ${secret}`, // Authorization header with the Snyk token
  };

  try {
    // Send a GET request to the Snyk API to validate the token
    const responseData = await axios.get(url, { headers });

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
      // If the response status code is not 200, handle it as an inactive key
      return handleInactiveResponse(service, response, responseData.data);
    }
  } catch (error) {
    // Handle errors that occur during the request and return the inactive status message
    return handleError(service, response, error);
  }
}

/**
 * Handle the case when the authentication key is inactive or invalid.
 * @param service - The name of the service being validated.
 * @param response - A flag to indicate whether to include detailed response data.
 * @param responseData - Optional additional data to include in the response.
 * @returns A formatted status message indicating the inactive status.
 */
function handleInactiveResponse(
  service: string,
  response: boolean,
  responseData: any
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
      responseData
    );
  }
}

/**
 * Handle errors that occur during the validation process.
 * @param service - The name of the service being validated.
 * @param response - A flag to indicate whether to include detailed response data.
 * @param error - The error object that was thrown.
 * @returns A formatted status message based on the type of error encountered.
 */
function handleError(service: string, response: boolean, error: any): string {
  let errorMessage = "";

  // Check if the error is an Axios error
  if (axios.isAxiosError(error)) {
    // Extract the error message or response data
    errorMessage = error.response ? error.response.data : error.message;
  } else {
    // Handle general errors that are not Axios errors
    errorMessage = error.message;
  }

  // Return inactive response handling with the error message
  return handleInactiveResponse(service, response, errorMessage);
}
