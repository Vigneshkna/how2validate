import * as logging from "loglevel"; // Importing the loglevel library for logging functionality
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
} from "./config_utility"; // Importing utility functions to get secret status values

/**
 * Set up the logging configuration.
 * This function initializes the logging level to INFO to control the verbosity of log messages.
 * @param {logging.LogLevelDesc} [level='INFO'] - Optional parameter to set the logging level.
 */
export function setupLogging(level: logging.LogLevelDesc = "INFO") {
  logging.setLevel(level); // Set logging level, default to INFO
}

/**
 * Generate a message about the status of a secret.
 * @param service - The name of the service associated with the secret.
 * @param isActive - The current status of the secret (active or inactive).
 * @param responseData - Optional data to provide more context if a response exists.
 * @returns A formatted message describing the secret's status.
 * @throws An error if the isActive value is not recognized.
 */
export function getSecretStatusMessage(
  service: string,
  isActive: string,
  response?: boolean,
  responseData?: any
): string {
  let status: string;

  // Check if the secret is active or inactive based on provided status
  if (isActive === getActiveSecretStatus()) {
    status = "active and operational"; // Set status message for active secret
  } else if (isActive === getInactiveSecretStatus()) {
    status = "inactive and not operational"; // Set status message for inactive secret
  } else {
    throw new Error(
      `Unexpected isActive value: ${isActive}. Expected 'Active' or 'InActive'.`
    );
  }

  // Base message about the secret's status
  let message = `The provided secret '${service}' is currently ${status}.`;

  // If response data exists, append it to the message
  if (responseData) {
    message += ` Here is the additional response data:\n${responseData}`;
  }

  return message; // Return the formatted status message
}
