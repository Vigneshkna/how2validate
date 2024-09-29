"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Tabs } from "./sections/tabs"
import { TxtSection } from "./sections/text-section"
import { ValidationForm } from "./sections/validations"
import { Foo } from "./sections/footer"
import { Faq } from "./sections/faq"
import { Header } from "./sections/header"

export function How2validate() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  const toggleTheme = () => {    
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        <header className="border-b">
          <Header theme={theme} onChange={()=>{toggleTheme()}}/>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">How2Validate</h2>
            <p className="text-muted-foreground">A CLI tool to validate secrets for different services.</p>
          </div>

          <Tabs />

          <section className="mb-8" id="summary">
            <TxtSection sectionTitle={"Quick Summary"} infoTxt={""} />
          </section>
          <section className="mb-8" id="spec">
            <TxtSection sectionTitle={"Full Specification"} infoTxt={""} />
          </section>


          <h3 className="text-2xl font-bold mb-4">Validate Secret</h3>
          <section className="mb-8 lg:w-[70%] lg:mx-auto" id="validate">
            <ValidationForm />
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