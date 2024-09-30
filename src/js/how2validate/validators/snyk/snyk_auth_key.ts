/**
 * @module Snyk Auth Key Validator
 * @description
 * This module provides functionality to validate Snyk Auth Key by interacting with the Snyk API.
 * It checks the validity of the provided token and returns appropriate status messages based on the response.
 * 
 * @requires axios
 * @requires ../../utility/config_utility.js
 * @requires ../../utility/log_utility.js
 */

import axios, { AxiosError } from "axios"; // Import Axios for making HTTP requests and AxiosError for error handling
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
} from "../../utility/config_utility.js"; // Import functions to get secret statuses
import { getSecretStatusMessage } from "../../utility/log_utility.js"; // Import function to format status messages

/**
 * Validate a Snyk auth key by making an API request to check its validity.
 * 
 * @async
 * @function validateSnykAuthKey
 * @param {string} service - The name of the service being validated.
 * @param {string} secret - The token or secret to validate.
 * @param {boolean} response - A flag to indicate whether to include detailed response data.
 * @param {boolean} [report] - An optional flag for additional reporting features.
 * 
 * @returns {Promise<string>} - A promise that resolves to a status message about the token validation.
 * @throws {Error} - Throws an error if the validation process encounters an unexpected issue.
 */
export async function validateSnykAuthKey(
  service: string,
  secret: string,
  response: boolean,
  report?: boolean
): Promise<string> {
  // Snyk API endpoint for retrieving user information
  const url = "https://snyk.io/api/v1/user";
  const nocacheHeaders = { "Cache-Control": "no-cache" }; // Header to prevent caching
  const headers = { Authorization: `token ${secret}` }; // Authorization header with the Snyk token
  
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
 * 
 * @function handleInactiveStatus
 * @param {string} service - The name of the service being validated.
 * @param {boolean} response - A flag to indicate whether to include detailed response data.
 * @param {any} [data] - Optional additional data to include in the response.
 * 
 * @returns {string} - A formatted status message indicating the inactive status.
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
 * 
 * @function handleErrors
 * @param {unknown} error - The error object that was thrown.
 * @param {string} service - The name of the service being validated.
 * @param {boolean} response - A flag to indicate whether to include detailed response data.
 * 
 * @returns {string} - A formatted status message based on the type of error.
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
