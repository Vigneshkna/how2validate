import { Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"

export const Header = (props: { theme: string, onChange: Function}) => {
    return (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg> */}
              <h1 className="text-xl font-bold">How2Validate</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <a href="#" className="hover:underline">Version</a>
              <a href="#" className="hover:underline">About</a>
              <a href="#" className="hover:underline">GitHub</a>
              <Button variant="ghost" size="icon" onClick={()=>{props.onChange()}}>
                {props.theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </nav>
          </div>
    )
}