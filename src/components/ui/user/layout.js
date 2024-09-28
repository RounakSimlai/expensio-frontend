import { useEffect } from 'react'
import Head from 'next/head'
import Router from 'next/router'
import { usePathname } from 'next/navigation'
import { Playfair_Display } from 'next/font/google'
import { useLoading } from '@/hooks/useLoading'
import UserNavbar from './navbar'

const playFair = Playfair_Display({
  weight: '400',
  subsets: ['latin']
})
export default function AuthLayout ({children, toggleTheme}) {

  // Hooks
  const { start, done } = useLoading()
  const pathname = usePathname()

  // Methods
  const onRouteChangeStart = () => {
    start()
  }

  const onRouteChangeComplete = () => {
    setTimeout(() => {
      done()
    }, 1)
  }

  // Side Effects

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
        <title>{`Expensio | ${pathname.split('/')[1].charAt(0).toUpperCase() + pathname.split('/')[1].slice(1)}`}</title>
        <meta name="description" content="Welcome to Expensio!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icon.png" />
      </Head>
      <UserNavbar toggleTheme={toggleTheme}>
        <main className={playFair.className}>
          {children}
        </main>
      </UserNavbar>
    </>
  )
}