"use client"

import "./styles.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { SetStateAction, useEffect, useState } from "react"
import { SessionContextProvider } from "../contexts/sessionContext"
import { Toaster } from "react-hot-toast"

export default function layout({ children }) {
  const [theme, setTheme] = useState("light")
  const [session, setSession] = useState<string>(undefined)

  const changeTheme = (t: String) => setTheme(t as SetStateAction<string>)
  const changeSession = (t: String) => setSession(t as SetStateAction<string>)
  useEffect(() => {
    if (localStorage.getItem("rym_session")) setSession(localStorage.getItem("rym_session"));

  }, [])
  return (
    <html data-theme={theme}>
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
