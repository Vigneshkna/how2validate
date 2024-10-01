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
  getAppName,
} from "../../utility/config_utility.js"; // Import functions to get secret statuses and app name
import { getSecretStatusMessage } from "../../utility/log_utility.js"; // Import function to format status messages
import { ValidationResult } from "../../utility/validationResult.js";

/**
 * Function to get the current timestamp in ISO format.
 * @returns {string} - The current timestamp.
 */
function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Validate a Snyk auth key by making an API request to check its validity.
 *
 * @async
 * @function validateSnykAuthKey
 * @param {string} service - The name of the service being validated.
 * @param {string} secret - The token or secret to validate.
 * @param {boolean} responseFlag - A flag to indicate whether to include detailed response data.
 * @param {boolean} [report] - An optional flag for additional reporting features.
 * @param {boolean} [isBrowser] - Flag to indicate if the function is called from the browser.
 *
 * @returns {Promise<ValidationResult>} - A promise that resolves to a validation result object.
 * @throws {Error} - Throws an error if the validation process encounters an unexpected issue.
 */
export async function validateSnykAuthKey(
  service: string,
  secret: string,
  responseFlag: boolean,
  report?: boolean,
  isBrowser: boolean = false
): Promise<ValidationResult | {} | "" | undefined> {
  const appName = getAppName() || "How2Validate";
  const timestamp = getCurrentTimestamp();
  const url = "https://snyk.io/api/v1/user";
  const nocacheHeaders = { "Cache-Control": "no-cache" };
  const headers = { Authorization: `token ${secret}` };

  try {
    const responseData = await axios.get(url, {
      headers: { ...nocacheHeaders, ...headers },
    });
    const res = getSecretStatusMessage(
      service,
      getActiveSecretStatus() as string,
      responseFlag,
      responseFlag ? JSON.stringify(responseData.data, null, 4) : undefined
    );

    if (responseData.status === 200) {
      if (isBrowser) {
        return {
          status: 200,
          app: appName,
          data: {
            validate: {
              state: res.state,
              message: res.message,
              response: res.response,
              report: report ? "email@how2validate.com" : undefined,
            },
          },
          timestamp,
        };
      } else {
        console.info(`${res.message} ${res.response}`);
      }
    } else if (responseData.status === 400) {
      if (isBrowser) {
        return {
          status: 400,
          app: appName,
          data: {
            validate: {
              state: res.state,
              message: res.message,
              response: res.response,
              report: report ? "email@how2validate.com" : undefined,
            },
          },
          timestamp,
        };
      } else {
        console.info(`${res.message} ${res.response}`);
      }
    } else if (responseData.status === 401) {
      if (isBrowser) {
        return {
          status: 401,
          app: appName,
          data: {
            validate: {
              state: res.state,
              message: res.message,
              response: res.response,
              report: report ? "email@how2validate.com" : undefined,
            },
          },
          timestamp,
        };
      } else {
        console.info(`${res.message} ${res.response}`);
      }
    } else if (responseData.status === 403) {
      if (isBrowser) {
        return {
          status: 403,
          app: appName,
          data: {
            validate: {
              state: res.state,
              message: res.message,
              response: res.response,
              report: report ? "email@how2validate.com" : undefined,
            },
          },
          timestamp,
        };
      } else {
        console.info(`${res.message} ${res.response}`);
      }
    } else {
      return handleInactiveStatus(
        service,
        responseFlag,
        responseData.data,
        report,
        isBrowser
      );
    }
  } catch (error) {
    return handleErrors(error, service, responseFlag, report, isBrowser);
  }

  return undefined; // Optional return if no other return is hit
}

/**
 * Handle the case when the token is inactive or invalid.
 *
 * @function handleInactiveStatus
 * @param {string} service - The name of the service being validated.
 * @param {boolean} responseFlag - A flag to indicate whether to include detailed response data.
 * @param {any} [data] - Optional additional data to include in the response.
 * @param {boolean} [isBrowser] - Flag to indicate if the function is called from the browser.
 *
 * @returns {ValidationResult} - A validation result object indicating the inactive status.
 */
function handleInactiveStatus(
  service: string,
  responseFlag: boolean,
  data?: any,
  report?: boolean,
  isBrowser: boolean = false
): ValidationResult | {} | "" | undefined {
  const appName = getAppName() || "How2Validate";
  const timestamp = getCurrentTimestamp();

  const res = getSecretStatusMessage(
    service,
    getInactiveSecretStatus() as string,
    responseFlag,
    data ? JSON.stringify(data) : "No additional data."
  );

  if (isBrowser) {
    if (!responseFlag) {
      return {
        status: data.status,
        app: appName,
        data: {
          validate: {
            state: res.state,
            message: res.message,
            response: "",
            report: report ? "email@how2validate.com" : undefined,
          },
        },
        timestamp,
      };
    } else {
      return {
        status: data.status,
        app: appName,
        data: {
          validate: {
            state: res.state,
            message: res.message,
            response: res.response,
            report: report ? "email@how2validate.com" : undefined,
          },
        },
        timestamp,
      };
    }
  } else {
    if (!responseFlag) {
      console.info(`${res.message}`);
    } else {
      console.info(`${res.message} ${res.response}`);
    }
  }
}

/**
 * Handle errors that occur during the validation process.
 *
 * @function handleErrors
 * @param {unknown} error - The error object that was thrown.
 * @param {string} service - The name of the service being validated.
 * @param {boolean} responseFlag - A flag to indicate whether to include detailed response data.
 * @param {boolean} [isBrowser] - Flag to indicate if the function is called from the browser.
 *
 * @returns {ValidationResult} - A validation result object based on the type of error.
 */
function handleErrors(
  error: unknown,
  service: string,
  responseFlag: boolean,
  report?: boolean,
  isBrowser: boolean = false
): ValidationResult | {} | "" | undefined {
  const appName = getAppName() || "How2Validate";
  const timestamp = getCurrentTimestamp();

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status || 500;

    const res = getSecretStatusMessage(
      service,
      getInactiveSecretStatus() as string,
      responseFlag,
      axiosError.response?.data
        ? JSON.stringify(axiosError.response?.data)
        : "An unexpected error occurred."
    );

    if (isBrowser) {
      if (!responseFlag) {
        return {
          status: status,
          app: appName,
          data: {
            validate: {
              state: res.state,
              message: res.message,
              response: res.response,
              report: report ? "email@how2validate.com" : undefined,
            },
          },
          timestamp,
        };
      } else {
        return {
          status: status,
          app: appName,
          data: {
            validate: {
              state: res.state,
              message: res.message,
              response: res.response,
              report: report ? "email@how2validate.com" : undefined,
            },
          },
          timestamp,
        };
      }
    } else {
      if (!responseFlag) {
        console.info(`${res.message}`);
      } else {
        console.info(`${res.message} ${res.response}`);
      }
    }
  }
}
