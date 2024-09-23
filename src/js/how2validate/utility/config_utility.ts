import * as path from 'path';
import * as fs from 'fs';
import * as ini from 'ini';

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

function getConfigFilePath() {
    if (process.env.NODE_ENV === 'production') {
      // Assuming your config.ini is in the dist folder when published
      return path.resolve(__dirname, '..', 'config.ini');
    } else {
      // For local development
      return path.resolve(__dirname, '..', '..', 'config.ini');
    }
  }
  
export function initConfig() {
  // Path to the config.ini file, relative to where your compiled JavaScript will be running (in dist)
  const configFilePath = getConfigFilePath();
  //const configFilePath = path.resolve(__dirname, '..', '..', 'config.ini'); // Adjusted for dist directory

  try {
    const configContent = fs.readFileSync(configFilePath, 'utf-8');
    config = ini.parse(configContent);  // Parse the .ini file
  } catch (error) {
    console.error(`Error: The file '${configFilePath}' was not found or could not be read.`);
  }
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
