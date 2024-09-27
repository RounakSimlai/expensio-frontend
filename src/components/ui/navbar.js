import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, Tooltip, Avatar, Menu, MenuItem, Grid, Accordion, AccordionDetails, AccordionSummary, Stack, ListItemIcon } from '@mui/material'
import { Menu as MenuIcon, ArrowDropDown as ArrowDropDownIcon, Login, CurrencyRupee, AttachMoney, DarkMode, LightMode, AccountCircle as AccountCircleIcon, Logout as LogoutIcon, Euro, CurrencyPound, CurrencyYen} from '@mui/icons-material'

import { fetchExchangeRate } from '@/store/ui/currency'
import ItemMenu from './itemMenu'
import AuthModal from '../auth/authModal'
import UserProfileSidebar from '../userSettings/UserProfileSidebar'

const settings = [
  { menuName: 'Profile', icon: { IconName: AccountCircleIcon, color: 'primary' }},
  { menuName: 'Logout', icon: { IconName: LogoutIcon, color: 'warning' }}
]

const currencyList = [
  { menuName: 'United States Dollar (USD)', value: 'usd', symbol: '$', icon: { IconName: AttachMoney, color: 'success' }},
  { menuName: 'Indian Rupees (INR)', value: 'inr', symbol: '₹', icon: { IconName: CurrencyRupee, color: 'warning' }},
  { menuName: 'Euro (EUR)', value: 'eur', symbol: '€', icon: { IconName: Euro, color: 'primary' }},
  { menuName: 'British Pound Sterling (GBP)', value: 'gbp', symbol: '£', icon: { IconName: CurrencyPound, color: 'info' }},
  { menuName: 'Canadian Dollar (CAD)', value: 'cad', symbol: '$', icon: { IconName: AttachMoney, color: 'error' }},
  { menuName: 'Japanese Yen (JPY)', value: 'jpy', symbol: '¥', icon: { IconName: CurrencyYen, color: 'secondary' }}
]

export default function NavBar ({window, toggleTheme}) {

  // Hooks
  const router = useRouter()
  const dispatch = useDispatch()
  const pathname = usePathname()
  // States
  const modalOpen = useSelector(state => state?.authModal?.isOpen)
  const userData = useSelector(state => state?.storage?.authUser)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElCurrency, setAnchorElCurrency] = useState(null)
  const [isDark, setIsDark] = useState(false)
  const [ActiveCurrency, setActiveCurrency] = useState(CurrencyRupee)
  const [openProfileSidebar, setOpenProfileSidebar] = useState(false)

  // Methods

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }
  const handleOpenUserMenu = (event) => {
    if (userData) {
      setAnchorElUser(event.currentTarget)
    } else {
      dispatch({type: 'authModal/open'})
    }
  }
  const handleOpenCurrencyMenu = (event) => {
    setAnchorElCurrency(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleCloseCurrencyMenu = () => {
    setAnchorElCurrency(null)
  }
  const changeTheme = () => {
    setIsDark(!isDark)
    toggleTheme()
  }
  const changeCurrency = (currency, icon, symbol) => {
    handleCloseCurrencyMenu()
    setActiveCurrency(icon)
    dispatch(fetchExchangeRate(currency, symbol))
  }
  const clickFunction = (loggingOut = false, menu) => {
    handleCloseUserMenu()
    if (loggingOut) {
      logOutUser()
    } else if (menu === 'Profile') {
      setOpenProfileSidebar(true)
    }
  }
  const logOutUser = () => {
    localStorage.clear()
    dispatch({type: 'localstorage/get'})
    Cookies.remove('accessToken')
    router.push('/')
  }

  // Side Effects
  useEffect(() => {
    if (!userData) {
      dispatch({type: 'localstorage/get'})
    }
  }, [userData])

  // Others
  const container = window !== undefined ? () => window().document.body : undefined

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
              <IconButton
                color="inherit"
                aria-label="open side menu"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{color: 'primary.main'}}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
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
              {userData && pathname !== '/' && <Tooltip title='Switch Currency'>
                <IconButton onClick={handleOpenCurrencyMenu}>
                  <Avatar alt="Currency" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
                    <ActiveCurrency />
                  </Avatar>
                </IconButton>
              </Tooltip>}
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
                userData && pathname !== '/' ?
                  <IconButton onClick={handleOpenUserMenu} sx={{ borderRadius: 0, color: 'white', columnGap: '10px', '& .MuiTouchRipple-root .MuiTouchRipple-child': { borderRadius: '0' }}}>
                    <Avatar alt="Profile Menu" src={userData.image} />
                    <Typography variant='caption' color='textPrimary'>{`${userData.first_name} ${userData.last_name}`}</Typography>
                  </IconButton>
                  : userData && pathname === '/' ?
                    <Button variant='contained' onClick={() => { router.push('/dashboard') }} sx={{ columnGap: '10px'}}>
                      <Typography variant='caption'>Go to Dashboard</Typography>
                    </Button>
                    :
                    <Button variant='contained' onClick={handleOpenUserMenu} sx={{ columnGap: '10px'}}>
                      <Typography variant='caption'>Login / Register</Typography>
                    </Button>
              }
              <Menu
                sx={{ mt: '40px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(({menuName, icon: {IconName, color}}, index) => (
                  <MenuItem key={index} onClick={() => { clickFunction(menuName === 'Logout', menuName) }}>
                    <ListItemIcon>
                      <IconName color={color} />
                    </ListItemIcon>
                    <ListItemText>{menuName}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
              <Menu
                sx={{ mt: '40px' }}
                id="menu-appbar"
                anchorEl={anchorElCurrency}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElCurrency)}
                onClose={handleCloseCurrencyMenu}
              >
                {currencyList.map(({menuName, value, icon: {IconName, color}}, index) => (
                  <MenuItem key={index} onClick={() => { changeCurrency(value, IconName) }}>
                    <ListItemIcon>
                      <IconName color={color} />
                    </ListItemIcon>
                    <ListItemText>{menuName}</ListItemText>
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            p: 5,
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 }
          }}
        >
          <Box sx={{ textAlign: 'center', p: '10px' }}>
            <Image onClick={handleDrawerToggle} priority alt="Expensio logo" src={isDark ? '/dark-logo.svg' : '/logo.svg'} width='200' height='70'/>
            <hr className='MuiDivider-root' style={{marginTop: '5px', marginBottom: '30px'}} />
            {
              userData
                ? (
                  <Accordion sx={{mt: '13rem'}}>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                        <Avatar alt="Profile Menu" src={`/images/users/${userData.image}`} />
                        <Typography>{`${userData.first_name} ${userData.last_name}`}</Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {settings.map(({menuName, icon: {IconName, color}}, index) => (
                          <ListItem key={index} disablePadding>
                            <ListItemIcon>
                              <IconName color={color} />
                            </ListItemIcon>
                            <ListItemButton onClick={() => { handleDrawerToggle(); clickFunction(menuName === 'Logout') }} sx={{ textAlign: 'center' }}>
                              <ListItemText primary={menuName} />
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ) : (
                  <Button sx={{mt: '13rem'}} variant="contained" color='secondary' onClick={() => { handleDrawerToggle(); dispatch({type: 'authModal/open'}) }} fullWidth startIcon={<Login />}>Sign in</Button>
                )}
          </Box>
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
      </Box>
      {modalOpen && <AuthModal isOpen={modalOpen}/>}
      {openProfileSidebar &&
      <UserProfileSidebar
        openProfileSidebar={openProfileSidebar}
        toggleProfileSidebar={() => { setOpenProfileSidebar(false) }} />
      }
    </>
  )
}
