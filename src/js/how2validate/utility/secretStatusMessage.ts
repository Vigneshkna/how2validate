/**
 * @interface SecretStatusMessage
 * Represents the structure of a validation result for the Snyk Auth Key.
 */
export interface SecretStatusMessage {
    state: string | undefined;
    message: string | undefined;
    response: string | undefined;
  }
  