import * as path from "path"; // Importing path module for handling file and directory paths
import * as fs from "fs"; // Importing fs module for file system operations
import * as ini from "ini"; // Importing ini module for parsing .ini configuration files

// Define an interface for the configuration structure
interface Config {
  DEFAULT?: {
    package_name?: string; // Package name from the DEFAULT section
    version?: string; // Version from the DEFAULT section
  };
  SECRET?: {
    secret_active?: string; // Active secret status from the SECRET section
    secret_inactive?: string; // Inactive secret status from the SECRET section
  };
}

// Variable to hold the configuration
let config: Config | null = null;

/**
 * Get the path to the configuration file based on the environment.
 * @returns The path to the config.ini file.
 */
function getConfigFilePath() {
  if (process.env.NODE_ENV === "production") {
    // Path for production environment, assumes config.ini is in the dist folder
    return path.resolve(__dirname, "..", "config.ini");
  } else {
    // Path for local development environment
    return path.resolve(__dirname, "..", "..", "config.ini");
  }
}

/**
 * Initialize the configuration by reading the config.ini file.
 */
export function initConfig() {
  const configFilePath = getConfigFilePath(); // Get the path to the config.ini file

  try {
    const configContent = fs.readFileSync(configFilePath, "utf-8"); // Read the file content
    config = ini.parse(configContent); // Parse the .ini file content into a JavaScript object
  } catch (error) {
    console.error(
      `Error: The file '${configFilePath}' was not found or could not be read.`
    ); // Log error if file cannot be read
  }
}

/**
 * Get the package name from the DEFAULT section of the config.
 * @returns The package name or undefined if not set.
 * @throws An error if the configuration is not initialized.
 */
export function getPackageName(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.package_name as string; // Return package name
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first."); // Error if config not initialized
  }
}

/**
 * Get the active secret status from the SECRET section of the config.
 * @returns The active secret status or undefined if not set.
 * @throws An error if the configuration is not initialized.
 */
export function getActiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_active as string; // Return active secret status
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first."); // Error if config not initialized
  }
}

/**
 * Get the inactive secret status from the SECRET section of the config.
 * @returns The inactive secret status or undefined if not set.
 * @throws An error if the configuration is not initialized.
 */
export function getInactiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_inactive as string; // Return inactive secret status
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first."); // Error if config not initialized
  }
}

/**
 * Get the version from the DEFAULT section of the config.
 * @returns The version or undefined if not set.
 * @throws An error if the configuration is not initialized.
 */
export function getVersion(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.version as string; // Return version
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first."); // Error if config not initialized
  }
}

// Automatically call initConfig when this module is imported to ensure configuration is loaded
initConfig();
