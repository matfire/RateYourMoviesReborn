import { ThemeProvider } from 'next-themes'
import Footer from '../components/Footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {


  return (
  <ThemeProvider>
    <div id="root">
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  </ThemeProvider>
  )
}

export default MyApp
