/**
 * @interface ValidationResult
 * Represents the structure of a validation result for the Snyk Auth Key.
 */
export interface ValidationResult {
    status: number;
    app: string;
    data?: {
      validate: {
        message: string;
        response: any;
        report?: string;
      };
    };
    error?: {
      message: string;
    };
    timestamp: string;
  }
  