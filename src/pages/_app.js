import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@mui/material/styles'
import { LoadingProvider } from '@/context/loadingContext'
import { darkTheme, lightTheme } from '@/themes'
import store from '../store'
import Layout from '../components/ui/layout'

export default function App ({ Component, pageProps }) {

  // States
  const [activeTheme, setActiveTheme] = useState(lightTheme)
  const [selectedTheme, setSelectedTheme] = useState('light')

  // Methods
  function getActiveTheme (themeMode) {
    return themeMode === 'light' ? lightTheme : darkTheme
  }

  const toggleTheme = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light'
    setSelectedTheme(desiredTheme)
  }

  // Side Effects
  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme])

  return (
    <ThemeProvider theme={activeTheme}>
      <Provider store={store}>
        <LoadingProvider>
          <Layout toggleTheme={toggleTheme}>
            <Component {...pageProps}/>
          </Layout>
        </LoadingProvider>
        <Toaster
          position="top-center"
          reverseOrder={true}
          autoClose={5000}
          pauseOnHover={true}
          toastOptions={{
            success: {
              style: {
                background: 'green',
                color: 'white'
              }
            },
            error: {
              style: {
                background: 'red',
                color: 'white'
              }
            }
          }}
        />
      </Provider>
    </ThemeProvider>
  )

}
