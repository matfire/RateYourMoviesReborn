import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserContext from '../context/userContext'
import '../styles/globals.css'
import client from '../utils/tmdb'

function MyApp({ Component, pageProps }) {
  const [sessionId, setSessionID] = useState("")

  useEffect(() => {
    client.setSessionId(sessionId)
    if (sessionId) {
      localStorage.setItem("tmdb_token", sessionId)
    }
    console.log(sessionId)
  }, [sessionId])

  useEffect(() => {
    if (localStorage.getItem("tmdb_token")) {
      setSessionID(localStorage.getItem("tmdb_token"))
    }
  }, [])

  return (
  <ThemeProvider>
    <div id="root">
      <Toaster />
      <UserContext.Provider value={{
        session_id: sessionId,
        setSessionId: (u) => setSessionID(u)
      }}>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
      </UserContext.Provider>
    </div>
  </ThemeProvider>
  )
}

export default MyApp
