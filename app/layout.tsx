"use client"

import "./styles.css"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { SetStateAction, useState } from "react"

export default function layout({ children }) {
  const [theme, setTheme] = useState("light")

  const changeTheme = (t: String) => setTheme(t as SetStateAction<string>)


  return (
    <html data-theme={theme}>
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Footer theme={theme} changeTheme={changeTheme} />
      </body>
    </html>
  )
}
