import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";

interface HeaderProps {
    theme: string;
    onChange: () => void; // Define the onChange prop more explicitly
}

export const Header = (props: HeaderProps) => {
    return (
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold">How2Validate</h1>
            </div>
            <nav className="flex items-center space-x-4">
                <a href="#" className="hover:underline">Version</a>
                <a href="#" className="hover:underline">About</a>
                <a href="#" className="hover:underline">GitHub</a>
                <Button variant="ghost" size="icon" onClick={props.onChange}>
                    {props.theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </nav>
        </div>
    );
};
