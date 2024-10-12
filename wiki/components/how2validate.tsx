"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs } from "./sections/tabs"
import { TxtSection } from "./sections/text-section"
import { ValidationForm } from "./sections/validations"
import { Foo } from "./sections/footer"
import { Faq } from "./sections/faq"
import { Header } from "./sections/header"
import CodeBlock from "./sections/code-snippet"
import { apiParams, apiParamsRec, apiPyParamsRec, apiPyReturns, apiReturns, cliString, codeStringJS, ex1, ex2, pyString, resStatus, secret } from "@/mocks/code-blocks"
import RingBullet from "./sections/text-bulletin"
import { Readme } from "./sections/readme"

export function How2validate() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {    
    setTheme(theme === "light" ? "dark" : "light")
  }

  const items = [
    'Item 1: This is a description for item 1.',
    'Item 2: This is a description for item 2.',
    'Item 3: This is a description for item 3.',
  ];

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        <header className="border-b">
          <Header theme={theme} onChange={()=>{toggleTheme()}}/>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">How2Validate</h1>
            <p className="text-muted-foreground">A CLI tool to validate secrets for different services.</p>
          </div>

          <Tabs />

          <section className="mb-8" id="intro">
            <TxtSection sectionTitle={"What is How2Validate"} infoTxt={"Welcome to How2Validate — your security-focused tool for validating sensitive secrets. Whether you're a developer, security professional, or DevOps engineer, How2Validate ensures that your API keys, tokens, and other sensitive information are authentic and secure by verifying them against official provider endpoints."} />
          </section>

          <section className="mb-8" id="summary">
            <TxtSection sectionTitle={"Quick Summary"} infoTxt={""} />
          </section>
          <section className="mb-8" id="spec">
            <TxtSection sectionTitle={"Full Specification"} infoTxt={""} />
          </section>

          <section className="mb-8 lg:mx-auto" id="readme">
            <Readme />
          </section>

          <section className="mb-8" id="faq">
            <Faq/>
          </section>

          <section className="mb-8" id="contibute">
            <h3 className="text-2xl font-bold mb-4">Contribute</h3>
            <Textarea rows={6} />
          </section>
        </main>

        <footer className="border-t">
          <Foo />
        </footer>
      </div>
    </div>
  )
}