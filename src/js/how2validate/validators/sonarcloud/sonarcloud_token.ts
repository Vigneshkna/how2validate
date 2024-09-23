import axios, { AxiosError } from 'axios';

import { getActiveSecretStatus, getInactiveSecretStatus } from '../../utility/config_utility';
import { getSecretStatusMessage } from '../../utility/log_utility';

export async function validateSonarcloudToken(
    service: string,
    secret: string,
    response: boolean,
    report?: boolean
): Promise<string> {
    const url = "https://sonarcloud.io/api/users/current";
    const nocacheHeaders = { 'Cache-Control': 'no-cache' };
    const headers = { 'Authorization': `Bearer ${secret}` };

    try {
        const responseData = await axios.get(url, {
            headers: { ...nocacheHeaders, ...headers }
        });

        if (responseData.status === 200) {
            if (!response) {
                return getSecretStatusMessage(service, getActiveSecretStatus() as string, response);
            } else {
                return getSecretStatusMessage(service, getActiveSecretStatus() as string, response, JSON.stringify(responseData.data, null, 4));
            }
        } else {
            return handleInactiveStatus(service, response, responseData.data);
        }
    } catch (error) {
        return handleErrors(error, service, response);
    }
}

function handleInactiveStatus(service: string, response: boolean, data?: any): string {
    if (!response) {
        return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response);
    } else {
        return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response, data ? JSON.stringify(data) : "No additional data.");
    }
}

function handleErrors(error: unknown, service: string, response: boolean): string {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (!response) {
            return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response);
        } else {
            return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response, axiosError.response?.data || axiosError.message);
        }
    }

    if (!response) {
        return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response);
    } else {
        return getSecretStatusMessage(service, getInactiveSecretStatus() as string, response, "An unexpected error occurred.");
    }
}
