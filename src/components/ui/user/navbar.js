import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { styled } from '@mui/material/styles'
import { Avatar, Box, CssBaseline, Grid, IconButton, Menu, Toolbar, Tooltip, Drawer as MuiDrawer, AppBar as MuiAppBar, Divider, Drawer, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, MenuItem, ListItemIcon, ListItemText} from '@mui/material'
import { Notifications as NotificationsIcon, Settings as SettingsIcon, ChevronLeft as ChevronLeftIcon, DarkMode, LightMode, Menu as MenuIcon, PowerSettingsNew, AttachMoney, CurrencyRupee, Euro, CurrencyPound, CurrencyYen } from '@mui/icons-material'
import { tooltipClasses } from '@mui/material/Tooltip'
import MainListItems from './mainListItems'
import UserProfileSidebar from '@/components/userSettings/UserProfileSidebar'
import { fetchExchangeRate } from '@/store/ui/currency'
const drawerWidth = 240

const UserAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const UserDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(10.1)
      })
    }
  })
)

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontSize: 20
  }
}))

const currencyList = [
  { menuName: 'United States Dollar (USD)', value: 'usd', symbol: '$', icon: { IconName: AttachMoney, color: 'success' }},
  { menuName: 'Indian Rupees (INR)', value: 'inr', symbol: '₹', icon: { IconName: CurrencyRupee, color: 'warning' }},
  { menuName: 'Euro (EUR)', value: 'eur', symbol: '€', icon: { IconName: Euro, color: 'primary' }},
  { menuName: 'British Pound Sterling (GBP)', value: 'gbp', symbol: '£', icon: { IconName: CurrencyPound, color: 'info' }},
  { menuName: 'Canadian Dollar (CAD)', value: 'cad', symbol: '$', icon: { IconName: AttachMoney, color: 'error' }},
  { menuName: 'Japanese Yen (JPY)', value: 'jpy', symbol: '¥', icon: { IconName: CurrencyYen, color: 'secondary' }}
]

export default function NavBar ({children, toggleTheme}) {
  // Hooks
  const dispatch = useDispatch()
  const router = useRouter()

  // States
  const userData = useSelector(state => state?.storage?.authUser)
  const [openDrawer, setOpenDrawer] = useState(true)
  const [openLogoutAlert, setOpenLogoutAlert] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [anchorElNotification, setAnchorElNotification] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openProfileSidebar, setOpenProfileSidebar] = useState(false)
  const [anchorElCurrency, setAnchorElCurrency] = useState(null)
  const [ActiveCurrency, setActiveCurrency] = useState(CurrencyRupee)

  // Methods
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null)
  }

  const changeTheme = () => {
    setIsDark(!isDark)
    toggleTheme()
  }
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const openLogoutModal = () => {
    setOpenLogoutAlert(true)
  }

  const closeLogoutModal = () => {
    setOpenLogoutAlert(false)
  }

  const logOutUser = () => {
    localStorage.clear()
    Cookies.remove('accessToken')
    dispatch({type: 'localstorage/get'})
    router.replace('/')
  }

  const handleOpenCurrencyMenu = (event) => {
    setAnchorElCurrency(event.currentTarget)
  }

  const handleCloseCurrencyMenu = () => {
    setAnchorElCurrency(null)
  }

  const changeCurrency = (currency, icon, symbol) => {
    handleCloseCurrencyMenu()
    setActiveCurrency(icon)
    dispatch(fetchExchangeRate(currency, symbol))
  }

  // Side Effects
  useEffect(() => {
    if (!userData) {
      dispatch({type: 'localstorage/get'})
    }
  }, [userData])

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <UserAppBar component="nav" sx={{background: isDark ? '#212121' : '#E6E1E1'}}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'space-around', sm: 'flex-end'},
              px: [1]
            }}
          >
            <Grid item sx={{ display: { sm: 'none' } }}>
              <IconButton
                color="inherit"
                aria-label="open side menu"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ display: { sm: 'none' } }}>
              <Link href='/'>
                <Image priority alt="Expensio logo" src={isDark ? '/dark-logo.svg' : '/logo.svg'} width='120' height='40'  style={{position: 'relative', left: '20px'}}/>
              </Link>
            </Grid>
            <Grid item sx={{ display:'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Tooltip title={!isDark ? 'Switch to dark mode' : 'Switch to light mode' }>
                <IconButton onClick={changeTheme}>
                  <Avatar alt="Theme" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}  >
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
              <Tooltip title='Switch Currency'>
                <IconButton onClick={handleOpenCurrencyMenu}>
                  <Avatar alt="Currency" sx={{bgcolor: 'primary.main', color: 'primary.contrastText'}}>
                    <ActiveCurrency />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElNotification}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElNotification)}
                onClose={handleCloseNotificationMenu}
              >
              </Menu>
            </Grid>
          </Toolbar>
        </UserAppBar>
        <UserDrawer variant="permanent" sx={{ display: { xs: 'none', sm: 'inherit' } }} open={openDrawer} PaperProps={{sx:{bgcolor: isDark ? '' : 'rgb(230, 225, 225)'}}}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              px: [1]
            }}
          >
            <IconButton
              color="inherit"
              aria-label="expensio-logo"
              edge="start"
              disableRipple
            >
              <Link href='/'>
                {
                  openDrawer ? (<Image priority alt="Expensio logo" src={isDark ? '/dark-logo.svg' : '/logo.svg'} width='130' height='42' style={{position: 'relative', left: '20px'}}/>)
                    : (<LightTooltip title="Expensio" placement='right'><Image priority alt="Expensio logo" src='/icon.svg' width='30' height='30' style={{position: 'relative', left: '9px'}}/></LightTooltip>)
                }
              </Link>
            </IconButton>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon sx={{color: 'text.secondary'}}  />
            </IconButton>
          </Toolbar>
          <Divider />
          <MainListItems openDrawer={openDrawer} />
          <div style={{ position: 'fixed', top: 'auto', bottom: 20}}>
            <Divider sx={{width: openDrawer ? '168%' : '230%', position: 'relative', bottom: '5px'}} />
            <Grid container justifyContent='center' alignItems='center' sx={{width: openDrawer ? '160%' : '100%'}}>
              {
                openDrawer ? (
                  <>
                    {/* <IconButton onClick={() => { setOpenProfileSidebar(true) }} sx={{ borderRadius: 0, color: 'text.primary', columnGap: '10px', '& .MuiTouchRipple-root .MuiTouchRipple-child': { borderRadius: '0' }}}> */}
                    <Grid item xs={4}>
                      <Avatar sx={{ position: 'relative', top: '3px', left: '10px', width: 35, height: 35 }} alt="Profile Pic" src={userData?.image || '/images/users/guest.jpg'} />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant='caption'>{`${userData?.first_name} ${userData?.last_name}`}</Typography>
                    </Grid>
                    {/* </IconButton> */}
                    <Grid item xs={2}>
                      <Tooltip title='Logout'>
                        <IconButton size="small" color='error' onClick={openLogoutModal}>
                          <PowerSettingsNew />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={12}>
                      <Avatar sx={{ position: 'relative', left: '15px', top: '2px', width: 35, height: 35 }} alt="Profile Pic" src={userData?.image || '/images/users/guest.jpg'} />
                    </Grid>
                  </>
                )}

            </Grid>
          </div>
        </UserDrawer>
        <nav>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: 'block', sm: 'none' }, p: 5, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 }}}
          >
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-around',
                px: [1]
              }}
            >
              <IconButton
                color="inherit"
                aria-label="expensio-logo"
                edge="start"
                disableRipple
                onClick={handleDrawerToggle}
              >
                <Link href='/admin'>
                  <Image priority alt="Expensio logo" src='/logo.svg' width='150' height='50'  style={{position: 'relative', left: '20px'}}/>
                </Link>
              </IconButton>
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon sx={{color: 'text.secondary'}}  />
              </IconButton>
            </Toolbar>
            <Divider />
            <MainListItems handleDrawerToggle={handleDrawerToggle} />
            <div style={{ position: 'fixed', top: 'auto', bottom: 20}}>
              <Divider sx={{width:{xs: '199%'}, position: 'relative', bottom: '5px'}} />
              <Grid container justifyContent='center' alignItems='center' sx={{width: '220%'}}>
                <Grid item xs>
                  <IconButton onClick={() => { setOpenProfileSidebar(true) }} sx={{ borderRadius: 0, color: 'white', columnGap: '10px', '& .MuiTouchRipple-root .MuiTouchRipple-child': { borderRadius: '0' }}}>
                    <Avatar sx={{ position: 'relative', top: '3px', left: '10px', width: 35, height: 35 }} alt="Profile Pic" src={userData?.image || '/images/users/guest.jpg'} />
                  </IconButton>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='subtitle2'>{`${userData?.first_name} ${userData?.last_name}`}</Typography>
                </Grid>
                <Grid item xs>
                  <Tooltip title='Logout'>
                    <IconButton size="small" color='error' onClick={openLogoutModal}>
                      <PowerSettingsNew />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </div>
          </Drawer>
        </nav>
        <Dialog
          open={openLogoutAlert}
          onClose={closeLogoutModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Logging out
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            Are you sure you want to Log out ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color='error' onClick={closeLogoutModal} autoFocus>No</Button>
            <Button onClick={logOutUser}>Yes</Button>
          </DialogActions>
        </Dialog>
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
        {openProfileSidebar &&
      <UserProfileSidebar
        openProfileSidebar={openProfileSidebar}
        toggleProfileSidebar={() => { setOpenProfileSidebar(false) }} />
        }
        <Box component="main" sx={{ height: '100vh', overflow: 'auto'}}>
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  )
}
