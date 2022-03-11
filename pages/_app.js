import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserContext from '../context/userContext'
import '../styles/globals.css'
import client from '../utils/tmdb'

function MyApp({ Component, pageProps }) {
  const [sessionId, setSessionID] = useState("")

  useEffect(() => {
    client.setSessionId(sessionId)
  }, [sessionId])

  return (
  <ThemeProvider>
    <div id="root">
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
