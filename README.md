![How2Validate](https://socialify.git.ci/Blackplums/how2validate/image?font=Inter&name=1&pattern=Solid&theme=Auto)
<!-- 
[![jsr.io](https://img.shields.io/badge/jsr.io-1.0.0-blue)](https://jsr.io/package/@how2validate/how2validate) [![PyPI](https://img.shields.io/pypi/v/how2validate)](https://pypi.org/project/how2validate/) [![Docker](https://img.shields.io/docker/v/ghcr.io/yourusername/how2validate?label=GitHub%20Docker%20Registry)](https://github.com/Blackplums/how2validate/pkgs/container/how2validate) -->

### About

How2Validate is a versatile security tool designed to streamline the process of validating sensitive secrets across various platforms and services.

Whether you're a developer, security professional, or DevOps engineer, How2Validate empowers you to ensure the authenticity and security of your API keys, tokens, and other critical information.

By leveraging the power of Python, JavaScript, and Docker, How2Validate offers a flexible and efficient solution for validating secrets against official provider endpoints. Its user-friendly command-line interface (CLI) makes it easy validating secrets, allowing you to quickly and accurately verify the integrity of your sensitive data.


### Why How2Validate?

In today's digital landscape, the exposure of sensitive information such as API keys, passwords, and tokens can lead to significant security breaches. These vulnerabilities often arise from:

- **Leaked API Keys**: Unintentional exposure through public repositories or logs.
- **Invalid Credentials**: Using outdated or incorrect credentials that can compromise systems.
- **Misconfigured Secrets**: Improperly managed secrets leading to unauthorized access.

**How2Validate** addresses these concerns by providing a robust solution to verify the authenticity and validity of your secrets directly with official providers. This proactive approach helps in:

- **Mitigating Risks**: Prevent unauthorized access by ensuring only active secrets are used.
- **Enhancing Security Posture**: Strengthen your application's security by regularly validating secrets.


### Features

**How2Validate** offers a range of features designed to enhance the security and efficiency of secret management:

- **Validate API Keys, Passwords, and Sensitive Information**: Interacts with official provider authentication endpoints to ensure the authenticity of secrets.
- **Cross-Platform Support**: Available for JavaScript, Python, and Docker environments.
- **Easy to Use**: Simplifies secret validation with straightforward commands and functions.
- **Real-Time Feedback**: Instantly know the status of your secrets — whether they are active or not.
- **Detailed Reporting**: Receive comprehensive reports on secret validation (Alpha Feature).
- **Updating Providers**: Keep the tool up-to-date with the latest secret providers and their secret types.

## Join Our Community discussions

Have questions? Feedback? Jump in and hang out with us

Join our [GitHub Community Discussion](https://github.com/Blackplums/how2validate/discussions)

## Packages

**How2Validate** is available for multiple platforms, ensuring seamless secret validation process. Choose the package manager that best fits your project needs:

### Package Statistics

Stay updated with the latest versions and downloads:

<div align="center">
  <a href="https://jsr.io/@how2validate/how2validate" target="_blank">
    <svg viewBox="0 0 13 7" class="inline w-auto relative mr-3" aria-hidden="true" height="56"><path d="M0,2h2v-2h7v1h4v4h-2v2h-7v-1h-4" fill="#083344"></path><g fill="#f7df1e"><path d="M1,3h1v1h1v-3h1v4h-3"></path><path d="M5,1h3v1h-2v1h2v3h-3v-1h2v-1h-2"></path><path d="M9,2h3v2h-1v-1h-1v3h-1"></path></g></svg>
  </a>
  <a href="https://pypi.org/project/how2validate/" target="_blank">
   <img src="https://pypi.org/static/images/logo-small.8998e9d1.svg" height="50" alt="pypi.org"  />
  </a>
  <a href="https://github.com/Blackplums/how2validate/pkgs/container/how2validate" target="_blank">
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" data-package-type="Container" class="mr-2"><path fill-rule="evenodd" d="M13.152.682a2.25 2.25 0 012.269 0l.007.004 6.957 4.276a2.276 2.276 0 011.126 1.964v7.516c0 .81-.432 1.56-1.133 1.968l-.002.001-11.964 7.037-.004.003a2.276 2.276 0 01-2.284 0l-.026-.015-6.503-4.502a2.268 2.268 0 01-1.096-1.943V9.438c0-.392.1-.77.284-1.1l.003-.006.014-.026a2.28 2.28 0 01.82-.827h.002L13.152.681zm.757 1.295h-.001L2.648 8.616l6.248 4.247a.776.776 0 00.758-.01h.001l11.633-6.804-6.629-4.074a.75.75 0 00-.75.003zM18 9.709l-3.25 1.9v7.548L18 17.245V9.709zm1.5-.878v7.532l2.124-1.25a.777.777 0 00.387-.671V7.363L19.5 8.831zm-9.09 5.316l2.84-1.66v7.552l-3.233 1.902v-7.612c.134-.047.265-.107.391-.18l.002-.002zm-1.893 7.754V14.33a2.277 2.277 0 01-.393-.18l-.023-.014-6.102-4.147v7.003c0 .275.145.528.379.664l.025.014 6.114 4.232z" fill="currentColor"></path></svg>
  </a>
</div>



## Installation

Installing **How2Validate** is straightforward, whether you're working with JavaScript, Python, or Docker. Follow the instructions below to set up the package in your environment.

### JavaScript

#### Using NPM
```bash
npx jsr add @how2validate/how2validate
```

#### Using pnpm
```bash
pnpm dlx jsr add @how2validate/how2validate
```

#### Using Bun
```bash
bunx jsr add @how2validate/how2validate
```

#### Using Yarn
```bash
yarn dlx jsr add @how2validate/how2validate
```

#### Using Deno
```bash
deno add jsr:@how2validate/how2validate
```


### Python

#### Using pip
```bash
pip install how2validate
```


### Docker
Get the latest version from [GitHub Package Registry](https://github.com/Blackplums/how2validate/pkgs/container/how2validate) 

#### Using docker
```bash
docker pull ghcr.io/blackplums/how2validate:main
```

## Usage

**How2Validate** can be used both programmatically and via the command-line interface (CLI). Below are detailed instructions for JavaScript, Python, and CLI usage.

### JavaScript

#### Importing and Using the Validate Function

```javascript
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
```


### Python

#### Importing and Using the Validate Function

```python
from how2validate import validate

# Validate secrets programmatically
validation_result = validate(
    provider="NPM",
    service="NPM Access Token",
    secret="<<SECRET_HERE>>",
    response=False,
    report=False,
)
print(validation_result)
```

## CLI

### Detailed CLI Help

The **How2Validate** tool provides multiple command-line options for validating secrets with precision.

To see all available commands, use:

```bash
how2validate --help

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

Ensuring the authenticity of your secrets.
```

### Example Command

#### Validate a Secret

```bash
how2validate -provider NPM -service "NPM Access Token" -secret "<<SECRET_HERE>>"
```

#### Validate with Response Status

```bash
how2validate -provider NPM -service "NPM Access Token" -secret "<<SECRET_HERE>>" -r
```


## API Reference

Detailed documentation of the **How2Validate API** for both JavaScript and Python.

### JavaScript API

`validate(provider, service, secret, response, report, isBrowser)`

Validates a secret against the specified provider and service.

- **Parameters:**
  - `provider` (string): The name of the provider (e.g., "NPM", "GitHub").
  - `service` (string): The specific service or token type.
  - `secret` (string): The secret to validate.
  - `response` (boolean): If `true`, returns the full response.
  - `report` (boolean): If `true`, sends a detailed report via email (Alpha Feature).
  - `isBrowser` (boolean): Indicates if the validation is performed in a browser environment.

- **Returns:**
  - `validationResult` (object): An object containing the validation status and details.

### Example

```javascript
import { validate } from '@how2validate/how2validate';

const result = validate("NPM", "NPM Access Token", "<<SECRET>>", false, false, true);
console.log(result);
```

### Python API

`validate(provider, service, secret, response, report)`

Validates a secret against the specified provider and service.

- **Parameters:**
  - `provider` (string): The name of the provider (e.g., "NPM", "GitHub").
  - `service` (string): The specific service or token type.
  - `secret` (string): The secret to validate.
  - `response` (boolean): If `true`, returns the full response.
  - `report` (boolean): If `true`, sends a detailed report via email (Alpha Feature).

- **Returns:**
  - `validation_result` (object): An object containing the validation status and details.


### Example

```python
from how2validate import validate

result = validate(
    provider="NPM",
    service="NPM Access Token",
    secret="<<SECRET>>",
    response=False,
    report=False
)
print(result)
```

## License

All `how2validate` packages are released under the MIT license.

