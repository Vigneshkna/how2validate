import { codeStringJS, pyString, cliString, secret, resStatus, apiParamsRec, apiReturns, ex1, apiPyParamsRec, apiPyReturns, ex2 } from "@/mocks/code-blocks"
import CodeBlock from "./code-snippet"
import RingBullet from "./text-bulletin"

export const Readme = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mt-4">{"About"}</h2>
          <hr className="mb-2"></hr>
          <div className="text mt-2">{"How2Validate is a versatile security tool designed to streamline the process of validating sensitive secrets across various platforms and services."}</div>
          <div className="text mt-2">{"Whether you're a developer, security professional, or DevOps engineer, How2Validate empowers you to ensure the authenticity and security of your API keys, tokens, and other critical information."}</div>
          <div className="text mt-2">{"By leveraging the power of Python, JavaScript, and Docker, How2Validate offers a flexible and efficient solution for validating secrets against official provider endpoints. Its user-friendly command-line interface (CLI) makes it easy validating secrets, allowing you to quickly and accurately verify the integrity of your sensitive data."}</div>

          <h2 className="text-2xl font-bold mt-4">{"Why How2Validate?"}</h2>
          <hr className="mb-2"></hr>
          <div className="text mb-2">{"In today's digital landscape, the exposure of sensitive information such as API keys, passwords, and tokens can lead to significant security breaches. These vulnerabilities often arise from:"}</div>
          <ul className="list-disc list-inside">
              <li className="text-gray-700">Leaked API Keys: Unintentional exposure through public repositories or logs.</li>
              <li className="text-gray-700">Invalid Credentials: Using outdated or incorrect credentials that can compromise systems.</li>
              <li className="text-gray-700">Misconfigured Secrets: Improperly managed secrets leading to unauthorized access.</li>
          </ul>
          <div className="text mb-2">{"How2Validate addresses these concerns by providing a robust solution to verify the authenticity and validity of your secrets directly with official providers. This proactive approach helps in:"}</div>
          <ul className="list-disc list-inside">
              <li className="text-gray-700">Mitigating Risks: Prevent unauthorized access by ensuring only active secrets are used.</li>
              <li className="text-gray-700">Enhancing Security Posture: Strengthen your application's security by regularly validating secrets.</li>
          </ul>


          <h2 className="text-2xl font-bold mt-4">{"Features"}</h2>
          <hr className="mb-2"></hr>
          <div className="text mb-2">{"How2Validate offers a range of features designed to enhance the security and efficiency of secret management."}</div>
          <ul className="list-disc list-inside">
              <li className="text-gray-700">Validate API Keys, Passwords, and Sensitive Information: Interacts with official provider authentication endpoints to ensure the authenticity of secrets.</li>
              <li className="text-gray-700">Cross-Platform Support: Available for JavaScript, Python, and Docker environments.</li>
              <li className="text-gray-700">Easy to Use: Simplifies secret validation with straightforward commands and functions.</li>
              <li className="text-gray-700">Real-Time Feedback: Instantly know the status of your secrets — whether they are active or not.</li>
              <li className="text-gray-700">Detailed Reporting: Receive comprehensive reports on secret validation (Alpha Feature).</li>
              <li className="text-gray-700">Updating Providers: Keep the tool up-to-date with the latest secret providers and their secret types.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-4">{"Join Our Community discussions"}</h2>
          <hr className="mb-2"></hr>
          <div className="text mt-2">{"Have questions? Feedback? Jump in and hang out with us"}</div>
          <div className="text mt-2">{"Join our GitHub Community Discussion"}</div>

          <h2 className="text-2xl font-bold mt-4">{"Packages"}</h2>
          <hr className="mb-2"></hr>
          <div className="text mt-2">{"How2Validate is available for multiple platforms, ensuring seamless secret validation process. Choose the package manager that best fits your project needs:"}</div>
          <h2 className="text-lg mt-4">{"Packages"}</h2>
          <div className="text mt-2">{"Stay updated with the latest versions and downloads:"}</div>

          <h2 className="text-2xl font-bold mt-4">{"Installation"}</h2>
          <hr className="mb-2"></hr> 
          <div className="text mt-2">{"Installing How2Validate is straightforward, whether you're working with JavaScript, Python, or Docker. Follow the instructions below to set up the package in your environment."}</div>
          
          
          <h2 className="text-xl mt-4">{"JavaScript"}</h2>

          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using NPM"}</h3>
            <CodeBlock codeBlock={"npx jsr add @how2validate/how2validate"} copyTxt={""}/>
          </div>

          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using pnpm"}</h3>
            <CodeBlock codeBlock={"pnpm dlx jsr add @how2validate/how2validate"} copyTxt={""}/>
          </div>

          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using Bun"}</h3>
            <CodeBlock codeBlock={"bunx jsr add @how2validate/how2validate"} copyTxt={""}/>
          </div>

          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using Yarn"}</h3>
            <CodeBlock codeBlock={"yarn dlxjsr add @how2validate/how2validate"} copyTxt={""}/>
          </div>

          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using Deno"}</h3>
            <CodeBlock codeBlock={"deno add @how2validate/how2validate"} copyTxt={""}/>
          </div>
          
          <h2 className="text-xl mt-4">{"Python"}</h2>
          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using pip"}</h3>
            <CodeBlock codeBlock={"pip install how2validate"} copyTxt={""}/>
          </div>

          <h2 className="text-xl mt-4">{"Docker"}</h2>
          Get the latest version from <a href="https://github.com/Blackplums/how2validate/pkgs/container/how2validate">GitHub Package Registry</a>
          <div className="p-2 mt-2 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-2">{"Using docker"}</h3>
            <CodeBlock codeBlock={"docker pull ghcr.io/blackplums/how2validate:main"} copyTxt={""}/>
          </div>


          <h2 className="text-2xl font-bold mt-4">{"Usage"}</h2>
          <hr className="mb-2"></hr>          
          <h3 className="mb-4">{"How2Validate can be used both programmatically and via the command-line interface (CLI). Below are detailed instructions for JavaScript, Python, and CLI usage."}</h3>
          
          <h2 className="text-2xl font-bold mb-2 mt-4">{"JavaScript"}</h2>
          <div className="p-8 bg-gray-100 min-h-[auto]">
            <h3 className="text-lg font-semibold mb-4">{"Importing and Using the Validate Function"}</h3>
            <CodeBlock codeBlock={codeStringJS} copyTxt={""}/>
          </div>

          <h2 className="text-2xl font-bold mb-2 mt-4">{"Python"}</h2>
          <div className="p-8 bg-gray-100 min-h-[auto]">
            <h3 className="text-md font-semibold mb-4">{"Importing and Using the Validate Function"}</h3>
            <CodeBlock codeBlock={pyString} copyTxt={""}/>
          </div>

          <h2 className="text-2xl font-bold mt-4">{"CLI"}</h2>
          <hr className="mb-2"></hr>          
          <h2 className="text-xl font-bold mb-4">{"Detailed CLI Help"}</h2>
            <div className="text-md mb-4">{"The How2Validate tool provides multiple command-line options for validating secrets with precision. To see all available commands, use:"}</div>
          <div className="p-8 bg-gray-100 min-h-[auto]">
            <CodeBlock codeBlock={cliString} copyTxt={""}/>
          </div>

          <h2 className="text-2xl font-bold mb-2 mt-4">{"Example Command"}</h2>
          <div className="p-8 bg-gray-100 min-h-[auto]">
            <h2 className="text-md font-bold mt-2 mb-1">{"Validate a Secret"}</h2>
            <CodeBlock codeBlock={secret} copyTxt={""}/>
            <h2 className="text-md font-bold mt-2 mb-1">{"Validate with Response Status"}</h2>
            <CodeBlock codeBlock={resStatus} copyTxt={""}/>
          </div>

          <h2 className="text-2xl font-bold mt-4">{"API Reference"}</h2>
          <hr className="mb-2"></hr>          
          <h2 className="mb-4">{"Detailed documentation of the How2Validate API for both JavaScript and Python."}</h2>
          <h2 className="text-2xl font-bold mb-2 mt-4">{"JavaScript API"}</h2>
            <div className="p-8 bg-gray-100 min-h-[auto]">
            <code className="bg-gray-200 text-gray-800 rounded px-1 font-mono">validate(provider, service, secret, response, report, isBrowser)</code>
            <h2 className="text-md mb-4">Validates a secret against the specified provider and service.</h2>
            <div className="min-h-[auto] p-1">
              <div className="text-lg font-bold">Parameters:</div>
              <RingBullet itemRecords={apiParamsRec} />
            </div>
            <div className="min-h-[auto] p-1">
              <div className="text-lg font-bold">Returns:</div>
              <RingBullet itemRecords={apiReturns} />
            </div>

            <h2 className="text-2xl font-bold mb-2 mt-4">{"Example"}</h2>
            <CodeBlock codeBlock={ex1} copyTxt={""}/>
          </div>

          <h2 className="text-2xl font-bold mb-2 mt-4">{"Python API"}</h2>
          <div className="p-8 bg-gray-100 min-h-[auto]">
            <code className="bg-gray-200 text-gray-800 rounded px-1 font-mono">validate(provider, service, secret, response, report)</code>
            <h2 className="text-md mb-4">Validates a secret against the specified provider and service.</h2>
            <div className="min-h-[auto] p-1">
              <div className="text-lg font-bold">Parameters:</div>
              <RingBullet itemRecords={apiPyParamsRec} />
            </div>
            <div className="min-h-[auto] p-1">
              <div className="text-lg font-bold">Returns:</div>
              <RingBullet itemRecords={apiPyReturns} />
            </div>

            <h2 className="text-2xl font-bold mb-2 mt-4">{"Example"}</h2>
            <CodeBlock codeBlock={ex2} copyTxt={""}/>
          </div>
          
          <h2 className="text-2xl font-bold mt-4">{"License"}</h2>
          <hr className="mb-2"></hr>          
          <h3 className="mb-4">{"All how2validate packages are released under the MIT license."}</h3>

        </>
    )
}