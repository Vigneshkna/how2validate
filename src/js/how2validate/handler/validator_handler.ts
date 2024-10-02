import { validateSnykAuthKey } from "../validators/snyk/snyk_auth_key.js"; // Import the Snyk authentication key validator
import { validateSonarcloudToken } from "../validators/sonarcloud/sonarcloud_token.js"; // Import the Sonarcloud token validator
import { validateNpmAccessToken } from "../validators/npm/npm_access_token.js"; // Import the NPM access token validator
import { ValidationResult } from "../utility/validationResult.js"; // Import the ValidationResult type
import path from "path";
import { initConfig } from "../utility/config_utility.js";

/**
 * @module validatorHandleService
 * 
 * This module handles the validation of secrets for various services using their respective validator functions.
 */

/**
 * @typedef {function} ValidatorFunction
 * @param {string} service - The name of the service being validated.
 * @param {string} secret - The secret (e.g., API key, token) to validate.
 * @param {boolean} response - Indicates whether to include response data in the output.
 * @param {boolean} report - Optional parameter for additional reporting functionality.
 * @param {boolean} isBrowser - Indicates if the validation is occurring in a browser environment.
 * @returns {Promise<ValidationResult | {} | "" | undefined>} The function returns a promise that resolves to a validation result message.
 */
type ValidatorFunction = (
  service: string,
  secret: string,
  response: boolean,
  report: boolean,
  isBrowser: boolean
) => Promise<ValidationResult | {} | "" | undefined>;


/** 
 * Map of service names to their corresponding validator functions.
 * @type {Record<string, ValidatorFunction>}
 */
const serviceHandlers: Record<string, ValidatorFunction> = {
  snyk_auth_key: validateSnykAuthKey, // Snyk auth key validator
  sonarcloud_token: validateSonarcloudToken, // Sonarcloud token validator
  npm_access_token: validateNpmAccessToken, // NPM access token validator
  // Add additional services and their validators here
};

/**
 * Handles the validation of a service's secret.
 * This function retrieves the appropriate validator function for the specified service
 * and invokes it with the provided secret and parameters.
 * 
 * @param {string} service - The name of the service to validate.
 * @param {string} secret - The secret (e.g., API key, token) to validate.
 * @param {boolean} response - A boolean indicating whether to include response data in the output.
 * @param {boolean} [report] - An optional parameter for additional reporting functionality.
 * @param {boolean} [isBrowser=false] - Indicates if the validation is occurring in a browser environment.
 * @returns {Promise<ValidationResult | {} | "" | undefined>} A promise that resolves to a string message indicating the validation result.
 * 
 * @example
 * const result = await validatorHandleService('snyk_auth_key', 'my-secret-key', true);
 * console.log(result); // Outputs the validation result for the specified service
 */
export async function validatorHandleService(
  service: string,
  secret: string,
  response: boolean,
  report: boolean,
  isBrowser: boolean = false
): Promise<ValidationResult | {} | "" | undefined> {
  // Retrieve the handler function based on the provided service name
  const handler = serviceHandlers[service];

  if (handler) {
    if(isBrowser){
      const configFilePath = path.join(process.cwd(), 'node_modules/@how2validate/how2validate/config.ini');
      initConfig(configFilePath)
    }
    // If a handler exists, call it with the provided parameters
    return handler(service, secret, response, report, isBrowser);
  } else {
    // Return an error message if no handler is found for the given service
    return `Error: No handler for service '${service}'`;
  }
}
