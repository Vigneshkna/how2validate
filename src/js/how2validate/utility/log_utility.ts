// Importing utility functions to get secret status values from the config
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
} from "./config_utility.js";
import { SecretStatusMessage } from "./secretStatusMessage.js";

/**
 * Generates a formatted message about the status of a secret.
 * This function evaluates whether the secret is active or inactive and constructs
 * a corresponding status message, with optional response data for additional context.
 *
 * @param {string} service - The name of the service associated with the secret.
 * @param {string} isActive - The current status of the secret (active or inactive).
 * This value is compared against the active/inactive status from the config.
 * @param {boolean} [response] - Optional boolean to indicate whether there is a response (not used for formatting).
 * @param {any} [responseData] - Optional data to provide additional context, appended to the message if available.
 * @returns {string} A formatted message describing the secret's status and response data (if provided).
 * 
 * @throws {Error} If the isActive value is not recognized (neither active nor inactive).
 * 
 * @example
 * const service = "Payment Service";
 * const isActive = getActiveSecretStatus(); // or getInactiveSecretStatus()
 * const message = getSecretStatusMessage(service, isActive);
 * console.log(message);
 * // Output: "The provided secret 'Payment Service' is currently active and operational."
 */
export function getSecretStatusMessage(
  service: string,
  isActive: string,
  response?: boolean,
  responseData?: any
): SecretStatusMessage {
  let state: string | undefined;
  let msgData: string;
  let resData: string = ""; // Initialize as empty string
  let status: string;

  // Check if the secret is active or inactive based on the provided status
  if (isActive === getActiveSecretStatus()) {
    state = getActiveSecretStatus();
    status = "active and operational"; // Set status message for active secret
  } else if (isActive === getInactiveSecretStatus()) {
    state = getInactiveSecretStatus();
    status = "inactive and not operational"; // Set status message for inactive secret
  } else {
    state = `Unexpected isActive value: ${isActive}. Expected 'Active' or 'Inactive'.`;
    // Throw an error if the status doesn't match the expected active/inactive values
    throw new Error(
      `Unexpected isActive value: ${isActive}. Expected 'Active' or 'Inactive'.`
    );
  }

  // Base message about the secret's status
  msgData = `The provided secret '${service}' is currently ${status}.`; // Assign value without redeclaration
  // If response data exists, append it to the message
  if (response) {
    resData = `\nHere is the additional response data:\n${responseData}`;
  }else{
    resData = "";
  }

  return {
    state: state,
    message: msgData,
    response: resData, // Ensure it returns the initialized variable
  }; // Return the formatted status message
}
