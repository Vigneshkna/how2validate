/**
 * @module config_utility
 * @description
 * This module provides functionality to initialize and access configuration settings
 * by reading from a config.ini file. It ensures that the configuration is loaded
 * before any dependent functions are used.
 *
 * @requires fs
 * @requires path
 * @requires url
 */

import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from 'url';

/**
 * Interface representing the structure of the configuration.
 */
interface Config {
  DEFAULT?: {
    package_name?: string;
    version?: string;
  };
  SECRET?: {
    secret_active?: string;
    secret_inactive?: string;
  };
}

/**
 * Holds the loaded configuration. Initialized to null until `initConfig` is called.
 */
let config: Config | null = null;

/**
 * Get the directory name of the current module.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initializes the configuration by reading the config.ini file.
 * This function reads the config file from the provided path or defaults to
 * the root configuration file located two levels above the current directory.
 *
 * @function initConfig
 * @param {string} [configFilePath] - The custom file path for config.ini (optional).
 * If not provided, the function will attempt to load the config file from
 * the default location.
 * 
 * @throws {Error} If the config file cannot be read or parsed.
 * 
 * @example
 * initConfig(); // Initializes with default config path
 * initConfig('/custom/path/config.ini'); // Initializes with a custom config file path
 */
export function initConfig(configFilePath?: string): void {
  const resolvedPath = configFilePath || path.resolve(process.cwd(), "config.ini");
    
  console.log(`Initializing configuration from: ${resolvedPath}`);
  
  try {
    if (!fs.existsSync(resolvedPath)) {
      throw new Error(`Configuration file not found at path: ${resolvedPath}`);
    }

    const configContent = fs.readFileSync(resolvedPath, "utf-8");
    config = parseConfigContent(configContent);
    console.log("Configuration successfully initialized.");
  } catch (error) {
    console.error(`Error initializing configuration: ${(error as Error).message}`);
    throw error; // Rethrow to prevent application from running with invalid config
  }
}

/**
 * Parses the content of the config.ini file and converts it to a Config object.
 * This function splits the content into sections and keys, building the Config object.
 *
 * @private
 * @param {string} content - The content of the config.ini file.
 * @returns {Config} The parsed configuration object.
 * 
 * @example
 * const configContent = "[DEFAULT]\npackage_name=my-package\nversion=1.0.0";
 * const config = parseConfigContent(configContent);
 * console.log(config.DEFAULT.package_name); // 'my-package'
 */
function parseConfigContent(content: string): Config {
  const lines = content.split("\n");
  const result: Config = {};

  let currentSection: keyof Config | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith(";")) continue; // Skip empty or comment lines

    if (trimmedLine.startsWith("[") && trimmedLine.endsWith("]")) {
      // New section
      currentSection = trimmedLine.slice(1, -1) as keyof Config;
      if (!result[currentSection]) {
        result[currentSection] = {};
      }
    } else if (currentSection) {
      const [key, value] = trimmedLine.split("=").map((part) => part.trim());
      if (key && value !== undefined) {
        (result[currentSection] as Record<string, string | undefined>)[key] = value;
      }
    }
  }

  return result;
}

/**
 * Retrieves the package name from the 'DEFAULT' section of the configuration.
 *
 * @function getPackageName
 * @returns {string | undefined} The package name if available.
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const packageName = getPackageName();
 * console.log(packageName); // Outputs the package name from config
 * 
 * @symbol package_name - The name of the package defined in the DEFAULT section.
 */
export function getPackageName(): string | undefined {
  if (config && config.DEFAULT && config.DEFAULT.package_name) {
    return config.DEFAULT.package_name;
  } else {
    throw new Error("Configuration not initialized or 'package_name' not set. Call initConfig() first.");
  }
}

/**
 * Retrieves the active secret status from the 'SECRET' section of the configuration.
 *
 * @function getActiveSecretStatus
 * @returns {string | undefined} The active secret status.
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const activeSecret = getActiveSecretStatus();
 * console.log(activeSecret); // Outputs the active secret status from config
 * 
 * @symbol secret_active - The status of the active secret defined in the SECRET section.
 */
export function getActiveSecretStatus(): string | undefined {
  if (config && config.SECRET && config.SECRET.secret_active) {
    return config.SECRET.secret_active;
  } else {
    throw new Error("Configuration not initialized or 'secret_active' not set. Call initConfig() first.");
  }
}

/**
 * Retrieves the inactive secret status from the 'SECRET' section of the configuration.
 *
 * @function getInactiveSecretStatus
 * @returns {string | undefined} The inactive secret status.
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const inactiveSecret = getInactiveSecretStatus();
 * console.log(inactiveSecret); // Outputs the inactive secret status from config
 * 
 * @symbol secret_inactive - The status of the inactive secret defined in the SECRET section.
 */
export function getInactiveSecretStatus(): string | undefined {
  if (config && config.SECRET && config.SECRET.secret_inactive) {
    return config.SECRET.secret_inactive;
  } else {
    throw new Error("Configuration not initialized or 'secret_inactive' not set. Call initConfig() first.");
  }
}

/**
 * Retrieves the version from the 'DEFAULT' section of the configuration.
 *
 * @function getVersion
 * @returns {string | undefined} The version if available.
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const version = getVersion();
 * console.log(version); // Outputs the version from config
 * 
 * @symbol version - The version of the package defined in the DEFAULT section.
 */
export function getVersion(): string | undefined {
  if (config && config.DEFAULT && config.DEFAULT.version) {
    return config.DEFAULT.version;
  } else {
    throw new Error("Configuration not initialized or 'version' not set. Call initConfig() first.");
  }
}

/**
 * Retrieves the application name from the 'DEFAULT' section of the configuration.
 *
 * @function getAppName
 * @returns {string | undefined} The application name if available.
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const appName = getAppName();
 * console.log(appName); // Outputs the application name from config
 * 
 * @symbol appName - The name of the application defined in the DEFAULT section.
 */
export function getAppName(): string | undefined {
  if (config && config.DEFAULT && config.DEFAULT.package_name) {
    return config.DEFAULT.package_name;
  } else {
    throw new Error("Configuration not initialized or 'package_name' not set. Call initConfig() first.");
  }
}

// Automatically initialize config when the file is imported
// You can comment this out if you prefer explicit initialization in your API routes
initConfig();
