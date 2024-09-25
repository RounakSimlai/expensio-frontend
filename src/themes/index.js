import { createTheme } from '@mui/material/styles'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4E51FE',
      light: '#6366ff',
      dark: '#3b3eff',
      contrastText: '#fff'
    },
    secondary:{
      main: '#9e9e9e',
      light: '#e0e0e0',
      dark: '#757575',
      contrastText: '#fff'
    },
    error:{
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828  ',
      contrastText: '#fff'
    },
    warning:{
      main: '#ed6c02',
      light: '#ff9800',
      dark: '#e65100',
      contrastText: '#fff'
    },
    info:{
      main: '#0288d1',
      light: '#03a9f4',
      dark: '#01579b',
      contrastText: '#fff'
    },
    success:{
      main: '#2e7d32',
      light: '#4caf50',
      dark: '#1b5e20',
      contrastText: '#fff'

    },
    background: {
      default: 'rgb(230, 225, 225)',
      paper: 'rgb(255, 255, 255)'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      icon: 'rgba(255, 255, 255, 0.5)',
      divider: 'rgba(255, 255, 255, 0.12)'
    },
    divider: 'rgba(0, 0, 0, 0.3)'
  }
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4E51FE',
      light: '#6366ff',
      dark: '#3b3eff',
      contrastText: '#fff'
    },
    secondary:{
      main: '#9e9e9e',
      light: '#e0e0e0',
      dark: '#757575',
      contrastText: '#fff'
    },
    error:{
      main: '#f44336',
      light: '#e57373',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    warning:{
      main: '#ffa726',
      light: '#ffb74d',
      dark: '#f57c00',
      contrastText: '#fff'
    },
    info:{
      main: '#29b6f6',
      light: '#4fc3f7',
      dark: '#0288d1',
      contrastText: '#fff'
    },
    success:{
      main: '#66bb6a',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff'
    },
    background: {
      default: '#212121',
      paper: '#212121'
    },
    action: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(0, 0, 0, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(0, 0, 0, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
      disabled: 'rgba(255, 255, 255, 0.38)'
    },
    divider: 'rgba(255, 255, 255, 0.12)'
  }
})