"use client"

import "./styles.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { SetStateAction, useEffect, useState } from "react"
import { SessionContextProvider } from "../contexts/sessionContext"
import { Toaster } from "react-hot-toast"

export default function Layout({ children }) {
  const [theme, setTheme] = useState("light")
  const [session, setSession] = useState<string>(undefined)

  const changeTheme = (t: string) => {
    setTheme(t)
    localStorage.setItem("rym_theme", t);
  }
  const changeSession = (t: string) => setSession(t)
  useEffect(() => {
    if (localStorage.getItem("rym_session")) setSession(localStorage.getItem("rym_session"));
    if (localStorage.getItem("rym_theme")) setTheme(localStorage.getItem("rym_theme"))
  }, [])
  return (
    <html data-theme={theme} lang="en">
      <head>
        <title>RYM</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Review, rate and save your favorite movies and tv shows" />
      </head>
      <body>
        <SessionContextProvider value={{ session, setSession: changeSession }}>
          <Toaster />
          <Header />
          <main>
            {children}
          </main>
          <Footer theme={theme} changeTheme={changeTheme} />
        </SessionContextProvider>
      </body>
    </html>
  )
}
