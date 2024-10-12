export const codeStringJS = `
import { validate } from '@how2validate/how2validate';

// Validate secrets programmatically
const validationResult = validate(
  provider = "NPM",
  service = "NPM Access Token",
  secret = "<<SECRET_HERE>>",
  response = false,
  report = false,
  isBrowser = true
);

console.log(validationResult);
`;

export const cliString = `how2validate --help

usage: How2Validate Tool

Validate various types of secrets for different services.

options:
  -h, --help          show this help message and exit
  -secretscope        Explore the secret universe. Your next target awaits.
  -provider PROVIDER  Specify your provider. Unleash your validation arsenal.
  -service SERVICE    Specify your target service. Validate your secrets with precision.
  -secret SECRET      Unveil your secrets to verify their authenticity.
  -r, --response      Monitor the status. View if your secret Active or InActive.
  -report             Get detailed reports. Receive validated secrets via email [Alpha Feature].
  -v, --version       Expose the version.
  --update            Hack the tool to the latest version.

Ensuring the authenticity of your secrets.`

export const pyString = `from how2validate import validate

# Validate secrets programmatically
validation_result = validate(
    provider="NPM",
    service="NPM Access Token",
    secret="<<SECRET_HERE>>",
    response=False,
    report=False,
)
print(validation_result)`

export const secret = `how2validate -provider NPM -service "NPM Access Token" -secret "<<SECRET_HERE>>"`

export const resStatus = `how2validate -provider NPM -service "NPM Access Token" -secret "<<SECRET_HERE>>" -r`

export const ex1 = `import { validate } from '@how2validate/how2validate';

const result = validate("NPM", "NPM Access Token", "<<SECRET>>", false, false, true);
console.log(result);`

export const ex2 = `from how2validate import validate

result = validate(
    provider="NPM",
    service="NPM Access Token",
    secret="<<SECRET>>",
    response=False,
    report=False
)
print(result)`

export const apiParams: string[] = [`provider (string): The name of the provider (e.g., "NPM", "GitHub").`,
"service (string): The specific service or token type.",
"secret (string): The secret to validate.",
"response (boolean): If true, returns the full response.",
"report (boolean): If true, sends a detailed report via email (Alpha Feature).",
"isBrowser (boolean): Indicates if the validation is performed in a browser environment.",]

export const apiParamsRec: Record<string, string> = {provider:` (string): The name of the provider (e.g., "NPM", "GitHub").`,
    service:" (string): The specific service or token type.",
    secret:" (string): The secret to validate.",
    response:" (boolean): If true, returns the full response.",
    report:" (boolean): If true, sends a detailed report via email (Alpha Feature).",
    isBrowser:" (boolean): Indicates if the validation is performed in a browser environment.",}

export const apiReturns: Record<string, string> = {validationResult:` (object): An object containing the validation status and details.`}

export const apiPyParamsRec: Record<string, string> = {provider:` (string): The name of the provider (e.g., "NPM", "GitHub").`,
  service:" (string): The specific service or token type.",
  secret:" (string): The secret to validate.",
  response:" (boolean): If true, returns the full response.",
  report:" (boolean): If true, sends a detailed report via email (Alpha Feature).",}

export const apiPyReturns: Record<string, string> = {validationResult:` (object): An object containing the validation status and details.`}