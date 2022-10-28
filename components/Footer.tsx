import Sun from "../icons/Sun"
import Moon from "../icons/Moon"

export default function Footer({ theme, changeTheme }: { theme: String, changeTheme: (t: String) => void }) {
  //const { theme, setTheme } = useTheme()

  return (
    <footer className='w-full flex justify-between'>
      <span>Copyright {new Date().getFullYear()}</span>
      <div className="h-8 w-8" onClick={() => changeTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ?
          <Sun /> : <Moon />
        }
      </div>
    </footer>
  )
}