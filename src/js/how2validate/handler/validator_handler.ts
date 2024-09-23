import { validateSnykAuthKey } from "../validators/snyk/snyk_auth_key"; // Import the Snyk authentication key validator
import { validateSonarcloudToken } from "../validators/sonarcloud/sonarcloud_token"; // Import the Sonarcloud token validator
import { validateNpmAccessToken } from "../validators/npm/npm_access_token"; // Import the NPM access token validator

// Define a type for the validator function signature
type ValidatorFunction = (
  service: string,
  secret: string,
  response: boolean,
  report?: boolean
) => Promise<string>;

// Map of service names to their corresponding validator functions
const serviceHandlers: Record<string, ValidatorFunction> = {
  snyk_auth_key: validateSnykAuthKey, // Snyk auth key validator
  sonarcloud_token: validateSonarcloudToken, // Sonarcloud token validator
  npm_access_token: validateNpmAccessToken, // NPM access token validator
  // Add additional services and their validators here
};

/**
 * Handle the validation of a service's secret.
 * @param service - The name of the service to validate.
 * @param secret - The secret (e.g., API key, token) to validate.
 * @param response - A boolean indicating whether to include response data in the output.
 * @param report - An optional parameter for additional reporting functionality.
 * @returns A promise that resolves to a string message indicating the validation result.
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
