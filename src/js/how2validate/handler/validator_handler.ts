import { validateSnykAuthKey } from '../validators/snyk/snyk_auth_key';
import { validateSonarcloudToken } from '../validators/sonarcloud/sonarcloud_token';
import { validateNpmAccessToken } from '../validators/npm/npm_access_token';

type ValidatorFunction = (service: string, secret: string, response: boolean, report?: boolean) => Promise<string>;

const serviceHandlers: Record<string, ValidatorFunction> = {
    snyk_auth_key: validateSnykAuthKey,
    sonarcloud_token: validateSonarcloudToken,
    npm_access_token: validateNpmAccessToken,
    // Add all your services here
};

export async function validatorHandleService(
    service: string,
    secret: string,
    response: boolean,
    report?: boolean
): Promise<string> {
    // Get the handler function based on the service name
    const handler = serviceHandlers[service];

    if (handler) {
        return handler(service, secret, response, report);
    } else {
        return `Error: No handler for service '${service}'`;
    }
}
