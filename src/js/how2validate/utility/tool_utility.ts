import * as fs from "fs"; // Importing the 'fs' module for file system operations
import * as path from "path"; // Importing the 'path' module for handling file and directory paths
import * as logging from "loglevel"; // Importing loglevel for logging messages
import Table from 'cli-table3';
import { execSync } from "child_process"; // Importing execSync to run shell commands synchronously

import { getPackageName } from "./config_utility"; // Importing a function to get the package name from configuration
import { setupLogging } from "./log_utility"; // Importing the function to set up logging

// Call the logging setup function to initialize logging configuration
setupLogging();

// Get the directory of the current file
const currentDir = __dirname;

// Define the path to the TokenManager JSON file
const tokenManager_filePath = path.join(
  currentDir,
  "..",
  "..",
  "tokenManager.json"
);

/**
 * Get the secret providers from the TokenManager JSON file.
 * @param filePath - The path to the TokenManager JSON file (default: tokenManager_filePath).
 * @returns An array of enabled secret providers.
 */
export function getSecretProviders(
  filePath: string = tokenManager_filePath
): string[] {
  // Read the JSON file and parse its contents
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const enabledSecretsServices: string[] = [];

  // Iterate through each provider in the data
  for (const provider in data) {
    const tokens = data[provider];
    // Check each token's enabled status
    for (const tokenInfo of tokens) {
      if (tokenInfo.is_enabled) {
        enabledSecretsServices.push(provider); // Add enabled provider to the list
      }
    }
  }
  return enabledSecretsServices; // Return the list of enabled secret providers
}

/**
 * Get the secret services from the TokenManager JSON file.
 * @param filePath - The path to the TokenManager JSON file (default: tokenManager_filePath).
 * @returns An array of enabled secret services.
 */
export function getSecretServices(
  filePath: string = tokenManager_filePath
): string[] {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const enabledSecretsServices: string[] = [];

  for (const provider in data) {
    const tokens = data[provider];
    for (const tokenInfo of tokens) {
      if (tokenInfo.is_enabled) {
        enabledSecretsServices.push(tokenInfo.display_name); // Add display name of enabled services
      }
    }
  }

  return enabledSecretsServices; // Return the list of enabled secret services
}

// Function to get and display secret providers and services
export function getSecretscope(filePath: string = tokenManager_filePath): void {
  // Read and parse the JSON file contents
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const table = new Table({
    head: ['Provider', 'Service'],  // Table headers
    style: {
      head: ['green'],  // Header styling
      border: ['white']  // Border styling
    }
  });

  let hasEnabledServices = false;

  // Iterate over each provider and their tokens
  for (const provider in data) {
    const tokens = data[provider];
    for (const tokenInfo of tokens) {
      if (tokenInfo.is_enabled) {
        table.push([provider, tokenInfo['display_name']]);  // Add rows to the table
        hasEnabledServices = true;
      }
    }
  }

  // Display the table or a message if no services are enabled
  if (hasEnabledServices) {
    console.log(table.toString());
  } else {
    console.log('No enabled services found.');
  }
}

/**
 * Format the enabled service providers for display.
 * @param filePath - The path to the TokenManager JSON file (default: tokenManager_filePath).
 * @returns A formatted string of enabled service providers.
 */
export function formatServiceProviders(
  filePath: string = tokenManager_filePath
): string {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const enabledSecretsServices: string[] = [];

  for (const provider in data) {
    const tokens = data[provider];
    for (const tokenInfo of tokens) {
      if (tokenInfo.is_enabled) {
        enabledSecretsServices.push(provider); // Add enabled provider to the list
      }
    }
  }

  // Format each service provider with a bullet point and join them into a single string
  return enabledSecretsServices.map((service) => ` - ${service}`).join("\n");
}

/**
 * Format the enabled services for display.
 * @param filePath - The path to the TokenManager JSON file (default: tokenManager_filePath).
 * @returns A formatted string of enabled services with their providers.
 */
export function formatServices(
  filePath: string = tokenManager_filePath
): string {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const enabledSecretsServices: string[] = [];

  for (const provider in data) {
    const tokens = data[provider];
    for (const tokenInfo of tokens) {
      if (tokenInfo.is_enabled) {
        // Add formatted string of provider and service display name
        enabledSecretsServices.push(`${provider} - ${tokenInfo.display_name}`);
      }
    }
  }

  // Format each service with a bullet point and join them into a single string
  return enabledSecretsServices.map((service) => `  - ${service}`).join("\n");
}

/**
 * Format a string by converting it to lowercase and replacing spaces with underscores.
 * @param inputString - The string to format.
 * @returns The formatted string.
 * @throws An error if the input is not a string.
 */
export function formatString(inputString: string): string {
  if (typeof inputString !== "string") {
    throw new Error("Input must be a string"); // Ensure input is a string
  }

  return inputString.toLowerCase().replace(/ /g, "_"); // Format the string
}

/**
 * Validate a user's choice against a list of valid choices.
 * @param value - The value to validate.
 * @param validChoices - An array of valid choices.
 * @returns The formatted value if valid.
 * @throws An error if the value is not valid.
 */
export function validateChoice(value: string, validChoices: string[]): string {
  const formattedValue = formatString(value); // Format the user's choice
  const formattedChoices = validChoices.map((choice) => formatString(choice)); // Format valid choices

  if (!formattedChoices.includes(formattedValue)) {
    // Throw an error if the choice is invalid
    throw new Error(
      `Invalid choice: '${value}'. Choose from ${validChoices.join(", ")}.`
    );
  }

  return formattedValue; // Return the formatted value
}

/**
 * Redact a secret by masking part of it with asterisks.
 * @param secret - The secret to redact.
 * @returns The redacted secret.
 * @throws An error if the input is not a string.
 */
export function redactSecret(secret: string): string {
  if (typeof secret !== "string") {
    throw new Error("Input must be a string"); // Ensure input is a string
  }

  if (secret.length <= 5) {
    return secret; // Return the secret as is if it's 5 characters or less
  }

  // Redact the secret by keeping the first 5 characters and masking the rest
  return secret.slice(0, 5) + "*".repeat(secret.length - 5);
}

/**
 * Update the tool to the latest version using the appropriate package manager.
 */
export function updateTool(): void {
  logging.info("Updating the tool..."); // Log the update initiation

  // Determine the package manager being used
  const packageManager = detectPackageManager();
  const packageName = getPackageName(); // Get the package name

  try {
    // Execute the appropriate command based on the package manager
    switch (packageManager) {
      case "npm":
        execSync(`npm install --global ${packageName}`, { stdio: "inherit" });
        break;
      case "yarn":
        execSync(`yarn global add ${packageName}`, { stdio: "inherit" });
        break;
      case "pnpm":
        execSync(`pnpm add --global ${packageName}`, { stdio: "inherit" });
        break;
      case "bun":
        execSync(`bun add ${packageName} --global`, { stdio: "inherit" });
        break;
      default:
        console.error(
          "Unsupported package manager. Please install the tool manually."
        );
        return; // Exit if the package manager is not recognized
    }
    console.log("Tool updated to the latest version."); // Log success message
  } catch (error) {
    console.error(`Failed to update the tool: ${error}`); // Log error message if the update fails
  }
}

/**
 * Detect the package manager installed on the system.
 * @returns The name of the package manager (npm, yarn, pnpm, bun, or unknown).
 */
function detectPackageManager(): string {
  try {
    execSync("npm --version", { stdio: "ignore" }); // Check for npm
    return "npm";
  } catch {
    try {
      execSync("yarn --version", { stdio: "ignore" }); // Check for yarn
      return "yarn";
    } catch {
      try {
        execSync("pnpm --version", { stdio: "ignore" }); // Check for pnpm
        return "pnpm";
      } catch {
        try {
          execSync("bun --version", { stdio: "ignore" }); // Check for bun
          return "bun";
        } catch {
          return "unknown"; // Return 'unknown' if no recognized package manager is found
        }
      }
    }
  }
}
