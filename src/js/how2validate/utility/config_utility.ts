const fs = require('fs');
const path = require('path');

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

/**
 * Initialize the configuration by reading the config.ini file.
 * Optionally accepts a custom file path.
 * @param {string} [configFilePath] - The custom file path for config.ini (optional).
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
 * Parse the content of the config.ini file and convert it to a Config object.
 * @param {string} content - The content of the config.ini file.
 * @returns {Config} - The parsed configuration object.
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

// Function to get the package name from the DEFAULT section
export function getPackageName(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.package_name as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

export function getActiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_active as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

export function getInactiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_inactive as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

export function getVersion(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.version as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

// Automatically initialize config when the file is imported
initConfig();
