import { Command } from "commander"; // Importing Commander for building CLI applications
import { setupLogging } from "./utility/log_utility"; // Importing the logging setup function
import {
  getActiveSecretStatus,
  getInactiveSecretStatus,
  getPackageName,
  getVersion,
} from "./utility/config_utility"; // Importing configuration utility functions
import {
  formatServiceProviders,
  formatServices,
  getSecretProviders,
  getSecretServices,
  redactSecret,
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
    "Expose the version"
  ); // Set the version and help flag

const providerChoices = getSecretProviders(); // Get supported secret providers
const serviceChoices = getSecretServices(); // Get supported secret services

// Define CLI options using Commander
program
  .option(
    "-provider <PROVIDER>",
    `Secret provider to validate secrets\nSupported providers:\n${formatServiceProviders()}`,
    (value) => validateChoice(value, providerChoices)
  ) // Option for provider
  .option(
    "-service <SERVICE>",
    `Service / SecretType to validate secrets\nSupported services:\n${formatServices()}`,
    (value) => validateChoice(value, serviceChoices)
  ) // Option for service
  .option("-secret <SECRET>", "Pass the secret to be validated") // Option for secret
  .option(
    "-r, --response",
    `Prints ${getActiveSecretStatus()} / ${getInactiveSecretStatus()} upon validating secrets`
  ) // Option for response
  .option("-report", "Reports validated secrets over E-mail", false) // Option to report secrets via email
  .option("--update", "Hack the tool to the latest version"); // Option to update the tool

// Function to validate the secret using the specified provider and service
export async function validate(
  provider: string,
  service: string,
  secret: string,
  response: boolean,
  report: boolean
) {
  console.info("Started validating secret...");
  const result = await validatorHandleService(
    service,
    secret,
    response,
    report
  ); // Call the handler for validation
  console.info(result);
}

// Main function to execute the CLI program logic
async function main() {
  program.parse(process.argv); // Parse command-line arguments

  // Convert options keys to lowercase for consistency
  const options = Object.fromEntries(
    Object.entries(program.opts()).map(([key, value]) => [
      key.toLowerCase(),
      value,
    ]) // Normalize option keys
  );

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
      `Initiating validation for service: ${
        options.service
      } with secret: ${redactSecret(options.secret)}`
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
