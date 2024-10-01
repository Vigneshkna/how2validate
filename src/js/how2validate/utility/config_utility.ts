import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from 'url';

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

let config: Config | null = null;

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the package.json file
const packageJsonPath = path.resolve(__dirname, "..", "..", "package.json");

/**
 * Initializes the configuration by reading the config.ini file.
 * This function reads the config file from the provided path or defaults to
 * the root configuration file located two levels above the current directory.
 *
 * @module config_utility
 * 
 * @param {string} [configFilePath] - The custom file path for config.ini (optional).
 * If not provided, the function will attempt to load the config file from
 * the default location.
 * 
 * @example
 * initConfig(); // Initializes with default config path
 * initConfig('/custom/path/config.ini'); // Initializes with a custom config file path
 */
export function initConfig(configFilePath?: string) {
  const resolvedPath = configFilePath || path.resolve(__dirname, "..", "..", "config.ini");

  try {
    const configContent = fs.readFileSync(resolvedPath, "utf-8");
    config = parseConfigContent(configContent); // Use a custom parsing function
  } catch (error) {
    console.error(
      `Error: The file '${resolvedPath}' was not found or could not be read.`
    );
  }
}

/**
 * Parses the content of the config.ini file and converts it to a Config object.
 * This function splits the content into sections and keys, building the Config object.
 *
 * @private
 * 
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
      result[currentSection] = {}; // Initialize the section as an object
    } else if (currentSection) {
      const [key, value] = trimmedLine.split("=").map((part) => part.trim());

      // Using type assertion to tell TypeScript that currentSection is valid
      (result[currentSection] as Record<string, string | undefined>)[key] = value;
    }
  }

  return result;
}

/**
 * Retrieves the package name from the 'DEFAULT' section of the configuration.
 * If the configuration has not been initialized, an error is thrown.
 *
 * @returns {string | undefined} The package name if available, or throws an error if the configuration is not initialized.
 * 
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const packageName = getPackageName();
 * console.log(packageName); // Outputs the package name from config
 */
export function getPackageName(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.package_name as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

/**
 * Retrieves the active secret status from the 'SECRET' section of the configuration.
 * If the configuration has not been initialized, an error is thrown.
 *
 * @returns {string | undefined} The active secret status or throws an error if the configuration is not initialized.
 * 
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const activeSecret = getActiveSecretStatus();
 * console.log(activeSecret); // Outputs the active secret status from config
 */
export function getActiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_active as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

/**
 * Retrieves the inactive secret status from the 'SECRET' section of the configuration.
 * If the configuration has not been initialized, an error is thrown.
 *
 * @returns {string | undefined} The inactive secret status or throws an error if the configuration is not initialized.
 * 
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const inactiveSecret = getInactiveSecretStatus();
 * console.log(inactiveSecret); // Outputs the inactive secret status from config
 */
export function getInactiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_inactive as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

/**
 * Retrieves the version from the 'DEFAULT' section of the configuration.
 * If the configuration has not been initialized, an error is thrown.
 *
 * @returns {string | undefined} The version if available, or throws an error if the configuration is not initialized.
 * 
 * @throws {Error} If the configuration is not initialized.
 * 
 * @example
 * const version = getVersion();
 * console.log(version); // Outputs the version from config
 */
export function getVersion(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.version as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

/**
 * Retrieves the app name from the package.json file.
 * If package.json cannot be read, an error message is logged.
 *
 * @returns {string | undefined} The app name from package.json.
 * 
 * @throws {Error} If the package.json file is not found or cannot be read.
 * 
 * @example
 * const appName = getAppName();
 * console.log(appName); // Outputs the app name from package.json
 */
export function getAppName(): string {
  try {
    const packageJsonContent = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(packageJsonContent);
    return packageJson.appName as string;
  } catch (error) {
    console.error("Error reading package.json:", error);
    return "appName";
  }
}

// Automatically initialize config when the file is imported
initConfig();
