import { validateSnykAuthKey } from "../validators/snyk/snyk_auth_key.js"; // Import the Snyk authentication key validator
import { validateSonarcloudToken } from "../validators/sonarcloud/sonarcloud_token.js"; // Import the Sonarcloud token validator
import { validateNpmAccessToken } from "../validators/npm/npm_access_token.js"; // Import the NPM access token validator

// Define a type for the validator function signature
type ValidatorFunction = (
  service: string,  // The name of the service being validated
  secret: string,   // The secret (e.g., API key, token) to validate
  response: boolean, // Indicates whether to include response data in the output
  report?: boolean   // Optional parameter for additional reporting functionality
) => Promise<string>; // The function returns a promise that resolves to a validation result message

// Map of service names to their corresponding validator functions
const serviceHandlers: Record<string, ValidatorFunction> = {
  snyk_auth_key: validateSnykAuthKey, // Snyk auth key validator
  sonarcloud_token: validateSonarcloudToken, // Sonarcloud token validator
  npm_access_token: validateNpmAccessToken, // NPM access token validator
  // Add additional services and their validators here
};

/**
 * Handle the validation of a service's secret.
 * This function retrieves the appropriate validator function for the specified service
 * and invokes it with the provided secret and parameters.
 * 
 * @param {string} service - The name of the service to validate.
 * @param {string} secret - The secret (e.g., API key, token) to validate.
 * @param {boolean} response - A boolean indicating whether to include response data in the output.
 * @param {boolean} [report] - An optional parameter for additional reporting functionality.
 * @returns {Promise<string>} A promise that resolves to a string message indicating the validation result.
 */
export async function validatorHandleService(
  service: string,
  secret: string,
  response: boolean,
  report?: boolean
): Promise<string> {
  // Retrieve the handler function based on the provided service name
  const handler = serviceHandlers[service];

  if (handler) {
    // If a handler exists, call it with the provided parameters
    return handler(service, secret, response, report);
  } else {
    // Return an error message if no handler is found for the given service
    return `Error: No handler for service '${service}'`;
  }
}
