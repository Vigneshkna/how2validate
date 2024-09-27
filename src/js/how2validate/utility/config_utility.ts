import * as path from "path";
import * as fs from "fs";

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

export function initConfig() {
  const configFilePath = path.resolve(__dirname, "..", "..", "config.ini");

  try {
    const configContent = fs.readFileSync(configFilePath, "utf-8");
    config = parseConfigContent(configContent); // Use a custom parsing function
  } catch (error) {
    console.error(
      `Error: The file '${configFilePath}' was not found or could not be read.`
    );
  }
}

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
      (result[currentSection] as Record<string, string | undefined>)[key] =
        value;
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

// Function to get the active secret status from the SECRET section
export function getActiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_active as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

// Function to get the inactive secret status from the SECRET section
export function getInactiveSecretStatus(): string | undefined {
  if (config && config.SECRET) {
    return config.SECRET.secret_inactive as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

// Function to get the version from the DEFAULT section
export function getVersion(): string | undefined {
  if (config && config.DEFAULT) {
    return config.DEFAULT.version as string;
  } else {
    throw new Error("Configuration not initialized. Call initConfig() first.");
  }
}

// Call initConfig when this file is imported or used
initConfig();
