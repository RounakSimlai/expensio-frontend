import { useState } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import { IconButton, InputAdornment, Button, TextField, Link, Grid, Box, Typography, Stack, Divider, SvgIcon } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { loginUser } from '@/store/auth'

export default function LoginTab () {

  // Hooks
  const dispatch = useDispatch()
  const router = useRouter()

  // States
  const [showPassword, setShowPassword] = useState(false)
  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  })

  // Methods
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleInput = (input, key) => {
    setInputData({
      ...inputData,
      [key]: input
    })
  }

  const userLogin = async () => {
    try {
      const response = await dispatch(loginUser({email: inputData.email, password: inputData.password})).unwrap()
      if (response.status.success) {
        const userObj = response?.data?.user
        localStorage.setItem('accessToken', JSON.stringify(response?.data?.access_token))
        localStorage.setItem('authUser', JSON.stringify(userObj))
        Cookies.set('accessToken', JSON.stringify(response?.data?.access_token), { expires: 1 })
        dispatch({type: 'localstorage/get'})
        dispatch({type: 'authModal/close'})
        router.replace('/dashboard')
      } else {
        toast.error(response.status.message)
      }
    } catch (ex) {
      toast.error(ex.message)
    }
  }

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography component="h1" variant="h5">
        Sign in
        </Typography>
        <Box component="form"sx={{ mt: 1 }}>
          <TextField
            value={inputData.email}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => { handleInput(e.target.value, 'email') }}
          />
          <TextField
            value={inputData.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            onChange={(e) => { handleInput(e.target.value, 'password') }}
            InputProps={{
              endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={userLogin}
          >
          Sign In
          </Button>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Link href="#" variant="body2">
              Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}