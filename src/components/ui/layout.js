import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { useLoading } from '@/hooks/useLoading'
import { Playfair_Display } from 'next/font/google'
import Navbar from './navbar'

const playFair = Playfair_Display({
  weight: '400',
  subsets: ['latin']
})

export default function Layout ({children, toggleTheme}) {
  const { start, done } = useLoading()

  const onRouteChangeStart = () => {
    start()
  }

  const onRouteChangeComplete = () => {
    setTimeout(() => {
      done()
    }, 1)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', onRouteChangeStart)
    Router.events.on('routeChangeComplete', onRouteChangeComplete)
    Router.events.on('routeChangeError', onRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', onRouteChangeStart)
      Router.events.off('routeChangeComplete', onRouteChangeComplete)
      Router.events.off('routeChangeError', onRouteChangeComplete)
    }
  })

  return (
    <>
      <Head>
        <title>Expensio</title>
        <meta name="description" content="Your Personal Expense Tracker" />
        <meta name="viewport" content="width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Navbar toggleTheme={toggleTheme} />
      <main className={playFair.className}>
        {children}
      </main>
    </>
  )
}

