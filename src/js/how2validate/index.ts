import { Command } from 'commander';
import { setupLogging } from './utility/log_utility';
import {
    getActiveSecretStatus,
    getInactiveSecretStatus,
    getPackageName,
    getVersion
} from './utility/config_utility';
import {
    formatServiceProviders,
    formatServices,
    getSecretProviders,
    getSecretServices,
    redactSecret,
    updateTool,
    validateChoice
} from './utility/tool_utility'
import { validatorHandleService } from './handler/validator_handler';


// Call the logging setup function
setupLogging();

const program = new Command();

program
    .name('How2Validate Tool')
    .description('Validate various types of secrets for different services.')
    .version(`How2Validate Tool version ${getVersion() as string}`, '-v, --version', 'Expose the version');

const providerChoices = getSecretProviders();
const serviceChoices = getSecretServices();

// Define CLI options using commander
program
    .option('-provider <provider>', `Secret provider to validate secrets\nSupported providers:\n${formatServiceProviders()}`, (value) => validateChoice(value, providerChoices))
    .option('-service <service>', `Service / SecretType to validate secrets\nSupported services:\n${formatServices()}`, (value) => validateChoice(value, serviceChoices))
    .option('-secret <secret>', 'Pass the secret to be validated')
    .option('-r, --response', `Prints ${getActiveSecretStatus()} / ${getInactiveSecretStatus()} upon validating secrets`)
    .option('-report', 'Reports validated secrets over E-mail', false)
    .option('--update', 'Hack the tool to the latest version');

async function validate(provider: string, service: string, secret: string, response: boolean, report: boolean) {
    console.info("Started validating secret...");
    const result = await validatorHandleService(service, secret, response, report);
    console.info(result);
}

async function main() {
    program.parse(process.argv);

    // Convert options keys to lowercase for consistency
    const options = Object.fromEntries(
        Object.entries(program.opts()).map(([key, value]) => [key.toLowerCase(), value])
    );

    if (options.update) {
        try {
            console.info("Initiating tool update...");
            await updateTool();
            console.info("Tool updated successfully.");
            return;
        } catch (error) {
            console.error(`Error during tool update: ${error}`);
            return;
        }
    }

    if (!options.provider || !options.service || !options.secret) {
        console.error("Missing required arguments: -provider, -service, -secret");
        console.error("Use '-h' or '--help' for tool usage information.");
        // program.help();
        return;
    }

    try {
        console.info(`Initiating validation for service: ${options.service} with secret: ${redactSecret(options.secret)}`);
        await validate(options.provider, options.service, options.secret, options.response, options.report);
        console.info("Validation completed successfully.");
    } catch (error) {
        console.error(`An error occurred during validation: ${error}`);
        console.log(`Error: ${error}`);
    }
}

main().catch(error => console.error(`Unexpected error: ${error}`));
