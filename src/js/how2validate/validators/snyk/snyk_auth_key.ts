import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import { getActiveSecretStatus, getInactiveSecretStatus } from '../../utility/config_utility';
import { getSecretStatusMessage } from '../../utility/log_utility';

export async function validateSnykAuthKey(
    service: string,
    secret: string,
    response: boolean,
    report?: boolean
): Promise<string> {
    // Snyk API endpoint for getting user information
    const url = 'https://snyk.io/api/v1/user';

    // Headers to ensure no caching and to authorize the request using the provided API key (token)
    const headers = {
        'Cache-Control': 'no-cache',
        Authorization: `token ${secret}`,
    };

    try {
        // Send a GET request to the Snyk API
        const responseData = await axios.get(url, { headers });

        // If the request was successful (HTTP 200)
        if (responseData.status === 200) {
            // If `response` is false, return the active status message without response data
            if (!response) {
                return getSecretStatusMessage(service, getActiveSecretStatus() as string, response);
            } else {
                // Return the status message along with the response data
                return getSecretStatusMessage(service, getActiveSecretStatus() as string, response, JSON.stringify(responseData.data, null, 4));
            }
        } else {
            // If the response status code is not 200, treat the secret as inactive
            return handleInactiveResponse(service, response, responseData.data);
        }
    } catch (error) {
        // Handle errors and return the inactive status message
        return handleError(service, response, error);
    }
}

function handleInactiveResponse(service: string, response: boolean, responseData: any): string {
    if (!response) {
        return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response);
    } else {
        return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response, responseData);
    }
}

function handleError(service: string, response: boolean, error: any): string {
    let errorMessage = '';

    if (axios.isAxiosError(error)) {
        errorMessage = error.response ? error.response.data : error.message;
    } else {
        errorMessage = error.message;
    }

    return handleInactiveResponse(service, response, errorMessage);
}
