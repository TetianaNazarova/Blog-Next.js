import Navigation from "@/components/navigation";
import Link from "next/link";
import DarkMode from "@/components/dark-mode";
import useServerDarkMode from "@/hooks/use-server-dark-mode";

export default function Header() {
    const theme = useServerDarkMode()
    return (
        <header className="flex justify-between md:items-center mt-4">
            <div className="flex items-center md:space-x-12">
                <div className="hidden md:block">
                    <Link  className="text-xl font-mono" href="/">Tetiana Nazarova</Link>
                </div>
                <Navigation />
            </div>
            <div>
                <DarkMode  defaultTheme={theme}/>
            </div>
        </header>
    )
}
