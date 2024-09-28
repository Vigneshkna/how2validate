import { Command } from "commander"; // Importing Commander for building CLI applications
import { setupLogging } from "./utility/log_utility"; // Importing the logging setup function
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
  getVersion,
} from "./utility/config_utility"; // Importing configuration utility functions
import {
  getSecretProviders,
  getSecretscope,
  getSecretServices,
  updateTool,
  validateChoice,
} from "./utility/tool_utility"; // Importing utility functions for secret validation
import { validatorHandleService } from "./handler/validator_handler"; // Importing the validation handler

// Call the logging setup function to configure logging
setupLogging();

const program = new Command(); // Create a new Commander program instance

// Configure the CLI program details
program
  .name("How2Validate Tool") // Set the name of the CLI tool
  .description("Validate various types of secrets for different services.") // Description of what the tool does
  .version(
    `How2Validate Tool version ${getVersion() as string}`,
    "-v, --version",
    "Expose the version."
  ); // Set the version and help flag

const providerChoices = getSecretProviders(); // Get supported secret providers
const serviceChoices = getSecretServices(); // Get supported secret services

/**
 * Define CLI options using Commander.
 * - secretscope: Option for secret scope
 * - provider: Option to specify a provider with validation
 * - service: Option to specify a service with validation
 * - secret: Option to specify the secret to validate
 * - response: Option to check if the secret is active or inactive
 * - report: Option to get reports via email (Alpha feature)
 * - update: Option to update the tool
 */
program
  .option(
    "-secretscope",
    `Explore the secret universe. Your next target awaits.`
  )
  .option(
    "-provider <PROVIDER>",
    `Specify your provider. Unleash your validation arsenal.`,
    (value: string) => validateChoice(value, providerChoices)
  )
  .option(
    "-service <SERVICE>",
    `Specify your target service. Validate your secrets with precision.`,
    (value: string) => validateChoice(value, serviceChoices)
  )
  .option("-secret <SECRET>", "Unveil your secrets to verify their authenticity.")
  .option(
    "-r, --response",
    `Monitor the status. View if your secret ${getActiveSecretStatus()} or ${getInactiveSecretStatus()}.`
  )
  .option("-report", "Get detailed reports. Receive validated secrets via email [Alpha Feature].", false)
  .option("--update", "Hack the tool to the latest version.");

/**
 * Validate the provided secret using the given provider, service, and options.
 *
 * @param {string} provider - The provider to use for validation.
 * @param {string} service - The service to validate the secret with.
 * @param {string} secret - The secret that needs to be validated.
 * @param {boolean} response - Whether to get a response status for the secret.
 * @param {boolean} report - Whether to generate a report for the validation.
 *
 * @returns {Promise<void>} - A promise that resolves when validation is complete.
 */
export async function validate(
  provider: string,
  service: string,
  secret: string,
  response: boolean,
  report: boolean
): Promise<void> {
  console.info("Started validating secret...");
  const result = await validatorHandleService(
    service,
    secret,
    response,
    report
  ); // Call the handler for validation
  console.info(result);
}

/**
 * Main function that executes the CLI program logic.
 * Parses the command-line arguments and performs actions based on the options provided.
 *
 * @returns {Promise<void>} - A promise that resolves when the program execution is complete.
 */
async function main(): Promise<void> {
  program.parse(process.argv); // Parse command-line arguments

  // Convert options keys to lowercase for consistency
  const options = Object.fromEntries(
    Object.entries(program.opts()).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ]) // Normalize option keys
  );

  // Check for the secretscope option
  if (options.secretscope) {
    try {
      getSecretscope();
      return; // Exit after updating
    } catch (error) {
      console.error(`Error fetching Scoped secret services: ${error}`); // Log any errors
      return;
    }
  }

  // Check for the update option
  if (options.update) {
    try {
      console.info("Initiating tool update...");
      await updateTool(); // Call the update function
      console.info("Tool updated successfully.");
      return; // Exit after updating
    } catch (error) {
      console.error(`Error during tool update: ${error}`); // Log any errors
      return;
    }
  }

  // Validate required arguments
  if (!options.provider || !options.service || !options.secret) {
    console.error("Missing required arguments: -provider, -service, -secret");
    console.error("Use '-h' or '--help' for tool usage information."); // Provide help info
    return;
  }

  // Attempt to validate the secret
  try {
    console.info(
      `Initiating validation for service: ${options.service} with a provided secret.`
    );
    await validate(
      options.provider,
      options.service,
      options.secret,
      options.response,
      options.report
    ); // Call validate function
    console.info("Validation completed successfully.");
  } catch (error) {
    console.error(`An error occurred during validation: ${error}`); // Handle validation errors
    console.log(`Error: ${error}`);
  }
}

// Start the main function and handle any unexpected errors
main().catch((error) => console.error(`Unexpected error: ${error}`));