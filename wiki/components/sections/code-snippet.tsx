type CodeSnippetProps = {
    codeBlock: string,
    copyTxt: string
}
import React from 'react';

const CodeBlock = (props: CodeSnippetProps) => {
  return (
      <div className="relative bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6">
        <pre className="text-sm text-gray-800">
          <code>
            {props.codeBlock}
          </code>
        </pre>

        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={() => navigator.clipboard.writeText(props.codeBlock)}
        >
            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="w-5 h-5">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
            </svg>
        </button>
      </div>
  );
};

export default CodeBlock;
