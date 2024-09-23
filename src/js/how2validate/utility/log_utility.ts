import * as logging from 'loglevel';
import { getActiveSecretStatus, getInactiveSecretStatus } from './config_utility';

export function setupLogging() {
  logging.setLevel('info'); // Set logging level to INFO
}

export function getSecretStatusMessage(service: string, isActive: string, response?: boolean, responseData?: any): string {
  // Normalize isActive values to handle both 'Active' and 'InActive'
  let status: string;
  
  if (isActive === getActiveSecretStatus()) {
    status = "active and operational";
  } else if (isActive === getInactiveSecretStatus()) {
    status = "inactive and not operational";
  } else {
    throw new Error(`Unexpected isActive value: ${isActive}. Expected 'Active' or 'InActive'.`);
  }

  // Base message about the secret's status
  let message = `The provided secret '${service}' is currently ${status}.`;
  
  // If a response exists, append it to the message
  if (response) {
    message += ` Here is the additional response data:\n${responseData}`;
  }

  return message;
}
