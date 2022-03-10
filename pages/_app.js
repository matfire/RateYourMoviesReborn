import { ThemeProvider } from 'next-themes'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {


  return (
  <ThemeProvider>
    <div id="root">
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  </ThemeProvider>
  )
}

export default MyApp
