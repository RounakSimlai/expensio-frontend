import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography, Button, Tooltip, Avatar, Grid } from '@mui/material'
import { DarkMode, LightMode } from '@mui/icons-material'

import AuthModal from '../auth/authModal'

export default function NavBar ({ toggleTheme }) {

  // Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()

  // States
  const modalOpen = useSelector(state => state?.authModal?.isOpen)
  const userData = useSelector(state => state?.storage?.authUser)
  const [isDark, setIsDark] = useState(false)

  // Methods
  const changeTheme = () => {
    setIsDark(!isDark)
    toggleTheme()
  }

  // Side Effects
  useEffect(() => {
    if (!userData) {
      dispatch({type: 'localstorage/get'})
    }
  }, [userData])

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <CssBaseline />
        <AppBar component="nav" sx={{background: isDark ? '#212121' : '#E6E1E1'}}>
          <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignContent: 'center'}}>

            {/* Mobile View Start */}
            <Grid item sx={{ display: { sm: 'none' } }}>
              <Link href='/'>
                <Image priority alt="Expensio logo" src={isDark ? '/dark-logo.svg' : '/logo.svg'} width='150' height='50'/>
              </Link>
            </Grid>
            <Grid item sx={{ display: { sm: 'none' } }}>
              <IconButton onClick={changeTheme}>
                <Avatar alt="Theme" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
                  {isDark
                    ? (
                      <DarkMode />
                    ) : (
                      <LightMode />
                    )
                  }
                </Avatar>
              </IconButton>
            </Grid>
            {/* Mobile View End */}

            <Grid item sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton
                color="inherit"
                aria-label="expensio-logo"
                edge="start"
                disableRipple
              >
                <Link href='/'>
                  <Image priority alt="Expensio logo" src={isDark ? '/dark-logo.svg' : '/logo.svg'} width='200' height='50'/>
                </Link>
              </IconButton>
            </Grid>
            <Grid item sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', justifyContent: 'space-between' }}>
              <Tooltip title={!isDark ? 'Switch to dark mode' : 'Switch to light mode' }>
                <IconButton onClick={changeTheme}>
                  <Avatar alt="Theme" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
                    {isDark
                      ? (
                        <DarkMode />
                      ) : (
                        <LightMode />
                      )
                    }
                  </Avatar>
                </IconButton>
              </Tooltip>
              {
                userData && pathname === '/' ?
                  <Button variant='contained' onClick={() => { router.push('/dashboard') }} sx={{ columnGap: '10px'}}>
                    <Typography variant='caption'>Go to Dashboard</Typography>
                  </Button>
                  :
                  <Button variant='contained' onClick={() => { dispatch({type: 'authModal/open'}) }} sx={{ columnGap: '10px'}}>
                    <Typography variant='caption'>Login / Register</Typography>
                  </Button>
              }
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      {modalOpen && <AuthModal isOpen={modalOpen}/>}
    </>
  )
}
