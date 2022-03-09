import { useTheme } from "next-themes"
import Sun from "../icons/Sun"
import Moon from "../icons/Moon"

export default function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className='w-full flex justify-between'>
      <span>Copyright {new Date().getFullYear()}</span>
      <div className="h-8 w-8" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ?
          <Sun /> : <Moon />
        }
      </div>
    </footer>
  )
}