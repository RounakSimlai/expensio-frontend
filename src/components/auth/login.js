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
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={userLogin}
          >
          Sign In with OTP
          </Button>
          <Grid container justifyContent="center" alignItems="center">
            <Grid item xs={12}>
              <Link href="#" variant="body2">
              Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Divider sx={{my:2}}>Or Log-in Using: </Divider>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <IconButton size="large" sx={{border: '1px #6A6767 solid', borderRadius: '50%'}}>
              <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px">
                  <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20 s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                  <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039 l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                  <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                  <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                </svg>
              </SvgIcon>
            </IconButton>
            <IconButton size="large" sx={{border: '1px #6A6767 solid', borderRadius: '50%'}}>
              <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="88.428 12.828 107.543 207.085" id="facebook">
                  <path fill="#3c5a9a" d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z">
                  </path>
                </svg>
              </SvgIcon>
            </IconButton>
            <IconButton size="large" sx={{border: '1px #6A6767 solid', borderRadius: '50%'}}>
              <SvgIcon>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 101.996 102" id="instagram"><defs><radialGradient id="a" cx="13.551" cy="102.482" r="133.147" gradientUnits="userSpaceOnUse"><stop offset=".09" stop-color="#fa8f21"></stop><stop offset=".78" stop-color="#d82d7e"></stop></radialGradient><radialGradient id="b" cx="61.859" cy="107.051" r="104.938" gradientUnits="userSpaceOnUse"><stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"></stop><stop offset="1" stop-color="#8c3aaa"></stop></radialGradient></defs><path fill="url(#a)" d="M34,51A17,17,0,1,1,51,68,17,17,0,0,1,34,51m-9.191,0A26.188,26.188,0,1,0,51,24.812,26.187,26.187,0,0,0,24.812,51M72.1,23.774a6.12,6.12,0,1,0,6.122-6.118h0a6.123,6.123,0,0,0-6.12,6.118M30.4,92.513a28.187,28.187,0,0,1-9.471-1.754,15.85,15.85,0,0,1-5.866-3.815,15.735,15.735,0,0,1-3.815-5.862A28.161,28.161,0,0,1,9.49,71.611c-.247-5.376-.3-6.991-.3-20.61s.053-15.23.3-20.61a28.374,28.374,0,0,1,1.754-9.471,15.85,15.85,0,0,1,3.815-5.866,15.718,15.718,0,0,1,5.866-3.815A28.161,28.161,0,0,1,30.4,9.484c5.376-.247,6.991-.3,20.6-.3s15.23.053,20.61.3a28.373,28.373,0,0,1,9.471,1.754,15.8,15.8,0,0,1,5.866,3.815,15.8,15.8,0,0,1,3.815,5.866,28.162,28.162,0,0,1,1.754,9.471c.247,5.38.3,6.991.3,20.61s-.049,15.23-.3,20.61a28.294,28.294,0,0,1-1.754,9.471,16.886,16.886,0,0,1-9.681,9.677,28.161,28.161,0,0,1-9.471,1.754c-5.376.247-6.991.3-20.61.3s-15.23-.049-20.6-.3M29.974.309A37.4,37.4,0,0,0,17.595,2.678,25.015,25.015,0,0,0,8.56,8.56a24.918,24.918,0,0,0-5.883,9.034A37.407,37.407,0,0,0,.309,29.974C.058,35.412,0,37.15,0,51S.058,66.588.309,72.026A37.405,37.405,0,0,0,2.678,84.405,24.931,24.931,0,0,0,8.56,93.44a25.076,25.076,0,0,0,9.034,5.883,37.43,37.43,0,0,0,12.379,2.369c5.441.247,7.176.309,21.026.309s15.588-.058,21.026-.309a37.405,37.405,0,0,0,12.379-2.369A26.075,26.075,0,0,0,99.322,84.405a37.3,37.3,0,0,0,2.369-12.379c.247-5.442.3-7.176.3-21.026s-.058-15.588-.3-21.026a37.394,37.394,0,0,0-2.369-12.379A25.08,25.08,0,0,0,93.44,8.56a24.955,24.955,0,0,0-9.03-5.883A37.347,37.347,0,0,0,72.03.309C66.593.062,64.854,0,51,0s-15.59.058-21.03.309" data-name="Path 14"></path><path fill="url(#b)" d="M34,51A17,17,0,1,1,51,68,17,17,0,0,1,34,51m-9.191,0A26.188,26.188,0,1,0,51,24.812,26.187,26.187,0,0,0,24.812,51M72.1,23.774a6.12,6.12,0,1,0,6.122-6.118h0a6.123,6.123,0,0,0-6.12,6.118M30.4,92.513a28.187,28.187,0,0,1-9.471-1.754,15.85,15.85,0,0,1-5.866-3.815,15.735,15.735,0,0,1-3.815-5.862A28.161,28.161,0,0,1,9.49,71.611c-.247-5.376-.3-6.991-.3-20.61s.053-15.23.3-20.61a28.374,28.374,0,0,1,1.754-9.471,15.85,15.85,0,0,1,3.815-5.866,15.718,15.718,0,0,1,5.866-3.815A28.161,28.161,0,0,1,30.4,9.484c5.376-.247,6.991-.3,20.6-.3s15.23.053,20.61.3a28.373,28.373,0,0,1,9.471,1.754,15.8,15.8,0,0,1,5.866,3.815,15.8,15.8,0,0,1,3.815,5.866,28.162,28.162,0,0,1,1.754,9.471c.247,5.38.3,6.991.3,20.61s-.049,15.23-.3,20.61a28.294,28.294,0,0,1-1.754,9.471,16.886,16.886,0,0,1-9.681,9.677,28.161,28.161,0,0,1-9.471,1.754c-5.376.247-6.991.3-20.61.3s-15.23-.049-20.6-.3M29.974.309A37.4,37.4,0,0,0,17.595,2.678,25.015,25.015,0,0,0,8.56,8.56a24.918,24.918,0,0,0-5.883,9.034A37.407,37.407,0,0,0,.309,29.974C.058,35.412,0,37.15,0,51S.058,66.588.309,72.026A37.405,37.405,0,0,0,2.678,84.405,24.931,24.931,0,0,0,8.56,93.44a25.076,25.076,0,0,0,9.034,5.883,37.43,37.43,0,0,0,12.379,2.369c5.441.247,7.176.309,21.026.309s15.588-.058,21.026-.309a37.405,37.405,0,0,0,12.379-2.369A26.075,26.075,0,0,0,99.322,84.405a37.3,37.3,0,0,0,2.369-12.379c.247-5.442.3-7.176.3-21.026s-.058-15.588-.3-21.026a37.394,37.394,0,0,0-2.369-12.379A25.08,25.08,0,0,0,93.44,8.56a24.955,24.955,0,0,0-9.03-5.883A37.347,37.347,0,0,0,72.03.309C66.593.062,64.854,0,51,0s-15.59.058-21.03.309" data-name="Path 15"></path></svg>
              </SvgIcon>
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </>
  )
}