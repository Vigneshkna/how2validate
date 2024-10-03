import { GitGraph, Github, ShieldCheck, Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
    theme: string;
    onChange: () => void; // Define the onChange prop more explicitly
}

export const Header = (props: HeaderProps) => {
    return (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" >
                    <ShieldCheck className="h-10 w-10" />
                </Button>
            </div>
            <nav className="flex items-center space-x-4">
                <a href="#version" className="hover:underline"><GitGraph className="h-5 w-5" /></a>
                <a href="https://github.com/Blackplums/how2validate" className="hover:underline" target="_blank"><Github className="h-5 w-5"/></a>
                <Button variant="ghost" size="icon" onClick={props.onChange}>
                    {props.theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </nav>
        </div>
    );
};
