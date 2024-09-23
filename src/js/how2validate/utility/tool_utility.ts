import * as fs from 'fs';
import * as path from 'path';
import * as logging from 'loglevel';
import { execSync } from 'child_process';

import { getPackageName } from './config_utility';
import { setupLogging } from './log_utility';

// Call the logging setup function
setupLogging();

// Get the directory of the current file
const currentDir = __dirname;

// Path to the TokenManager JSON file
const tokenManager_filePath = path.join(currentDir, '..', '..', 'tokenManager.json');

export function getSecretProviders(filePath: string = tokenManager_filePath): string[] {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const enabledSecretsServices: string[] = [];

    for (const provider in data) {
        const tokens = data[provider];
        for (const tokenInfo of tokens) {
            if (tokenInfo.is_enabled) {
                enabledSecretsServices.push(provider);
            }
        }
    }
    return enabledSecretsServices;
}

export function getSecretServices(filePath: string = tokenManager_filePath): string[] {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const enabledSecretsServices: string[] = [];

    for (const provider in data) {
        const tokens = data[provider];
        for (const tokenInfo of tokens) {
            if (tokenInfo.is_enabled) {
                enabledSecretsServices.push(tokenInfo.display_name);
            }
        }
    }

    return enabledSecretsServices;
}

export function formatServiceProviders(filePath: string = tokenManager_filePath): string {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const enabledSecretsServices: string[] = [];

    for (const provider in data) {
        const tokens = data[provider];
        for (const tokenInfo of tokens) {
            if (tokenInfo.is_enabled) {
                enabledSecretsServices.push(provider);
            }
        }
    }

    return enabledSecretsServices.map(service => ` - ${service}`).join('\n');
}

export function formatServices(filePath: string = tokenManager_filePath): string {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const enabledSecretsServices: string[] = [];

    for (const provider in data) {
        const tokens = data[provider];
        for (const tokenInfo of tokens) {
            if (tokenInfo.is_enabled) {
                enabledSecretsServices.push(`${provider} - ${tokenInfo.display_name}`);
            }
        }
    }

    return enabledSecretsServices.map(service => `  - ${service}`).join('\n');
}

export function formatString(inputString: string): string {
    if (typeof inputString !== 'string') {
        throw new Error("Input must be a string");
    }
    
    return inputString.toLowerCase().replace(/ /g, '_');
}

export function validateChoice(value: string, validChoices: string[]): string {
    const formattedValue = formatString(value);
    const formattedChoices = validChoices.map(choice => formatString(choice));

    if (!formattedChoices.includes(formattedValue)) {
        throw new Error(`Invalid choice: '${value}'. Choose from ${validChoices.join(', ')}.`);
    }

    return formattedValue;
}

export function redactSecret(secret: string): string {
    if (typeof secret !== 'string') {
        throw new Error("Input must be a string");
    }

    if (secret.length <= 5) {
        return secret;  // Return the secret as is if it's 5 characters or less
    }

    return secret.slice(0, 5) + '*'.repeat(secret.length - 5);
}

export function updateTool(): void {
    logging.info("Updating the tool...");
    
    // Determine the package manager
    const packageManager = detectPackageManager();
    const packageName = getPackageName();

    try {
        switch (packageManager) {
            case 'npm':
                execSync(`npm install --global ${packageName}`, { stdio: 'inherit' });
                break;
            case 'yarn':
                execSync(`yarn global add ${packageName}`, { stdio: 'inherit' });
                break;
            case 'pnpm':
                execSync(`pnpm add --global ${packageName}`, { stdio: 'inherit' });
                break;
            case 'bun':
                execSync(`bun add ${packageName} --global`, { stdio: 'inherit' });
                break;
            default:
                console.error("Unsupported package manager. Please install the tool manually.");
                return;
        }
        console.log("Tool updated to the latest version.");
    } catch (error) {
        console.error(`Failed to update the tool: ${error}`);
    }
}

function detectPackageManager(): string {
    try {
        execSync('npm --version', { stdio: 'ignore' });
        return 'npm';
    } catch {
        try {
            execSync('yarn --version', { stdio: 'ignore' });
            return 'yarn';
        } catch {
            try {
                execSync('pnpm --version', { stdio: 'ignore' });
                return 'pnpm';
            } catch {
                try {
                    execSync('bun --version', { stdio: 'ignore' });
                    return 'bun';
                } catch {
                    return 'unknown'; // For unrecognized package managers
                }
            }
        }
    }
}