import { useState } from 'react'
import { MuiTelInput } from 'mui-tel-input'
import { Button, TextField, Grid, Box, Typography, Divider, IconButton, Stack, SvgIcon, Accordion, AccordionSummary, AccordionDetails, ListItem, List, InputAdornment, Avatar } from '@mui/material'
import { ExpandMore as ExpandMoreIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material'
import PassCheck from '../ui/passwordStrengthChecker'
import styled from '@emotion/styled'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export default function RegistrationDetails ({inputData, errors, handleInput, validateInput, userRegister}) {

  // States
  const [showPassword, setShowPassword] = useState(false)
  const [showPassword2, setShowPassword2] = useState(false)

  // Methods

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show)
  const handleMouseDownPassword2 = (event) => {
    event.preventDefault()
  }

  return (
    <Box component="form" sx={{ mt: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <label htmlFor='hidden-input' style={{cursor: 'pointer'}}>
            <Avatar alt='image' src={inputData.image} sx={{width: 150, height: 150, ml: 23 }} />
          </label>
          <VisuallyHiddenInput id='hidden-input' type="file" onChange={(event) => { handleInput(event.target.files[0], 'image') }} accept=".png, .jpg, .jpeg"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="first_name"
            name="first_name"
            label="First Name"
            value={inputData.first_name}
            error={errors.first_name !== '' }
            helperText={errors.first_name}
            required
            fullWidth
            autoComplete="given-name"
            autoFocus
            onChange={(e) => { handleInput(e.target.value, 'first_name') }}
            onKeyUp={(e) => { validateInput(e.target.value, 'first_name') }}
            onblur={(e) => { validateInput(e.target.value, 'first_name') }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="last_name"
            name="last_name"
            label="Last Name"
            value={inputData.last_name}
            error={errors.last_name !== '' }
            helperText={errors.last_name}
            required
            fullWidth
            autoComplete="family-name"
            onChange={(e) => { handleInput(e.target.value, 'last_name') }}
            onKeyUp={(e) => { validateInput(e.target.value, 'last_name') }}
            onblur={(e) => { validateInput(e.target.value, 'last_name') }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            value={inputData.email}
            error={errors.email !== '' }
            helperText={errors.email}
            type='email'
            required
            fullWidth
            autoComplete="email"
            onChange={(e) => { handleInput(e.target.value, 'email') }}
            onKeyUp={(e) => { validateInput(e.target.value, 'email') }}
            onblur={(e) => { validateInput(e.target.value, 'email') }}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTelInput
            value={inputData.phone_number}
            defaultCountry="IN"
            fullWidth
            preferredCountries={['IN', 'BD', 'LK', 'NP', 'BT', 'CN', 'MM', 'PK']}
            onChange={(e) => { handleInput(e, 'phone_number') }}
            onKeyUp={(e) => { validateInput(e.target.value, 'phone_number') }}
            onblur={(e) => { validateInput(e.target.value, 'phone_number') }}
          />
        </Grid>
        <Grid item xs={12} container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="password"
              name="password"
              label="Password"
              value={inputData.password}
              error={errors.password !== '' }
              helperText={errors.password}
              type={showPassword ? 'text' : 'password'}
              required
              fullWidth
              autoComplete="new-password"
              onChange={(e) => { handleInput(e.target.value, 'password') }}
              onKeyUp={(e) => { validateInput(e.target.value, 'password') }}
              onblur={(e) => { validateInput(e.target.value, 'password') }}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="cnf-password"
              name="cnf-password"
              label="Confirm Password"
              error={errors.cnfPassword !== '' }
              helperText={errors.cnfPassword}
              type={showPassword2 ? 'text' : 'password'}
              required
              fullWidth
              autoComplete="new-password"
              onChange={(e) => { validateInput(e.target.value, 'cnfPassword') }}
              onKeyUp={(e) => { validateInput(e.target.value, 'cnfPassword') }}
              onblur={(e) => { validateInput(e.target.value, 'cnfPassword') }}
              InputProps={{
                endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    onMouseDown={handleMouseDownPassword2}
                    edge="end"
                  >
                    {showPassword2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }}
            />
          </Grid>
        </Grid>
        { inputData.password &&
            <Grid item xs={12}>
              <PassCheck password={inputData.password}/>
            </Grid>
        }
        <Grid item xs={12}>
          <Accordion sx={{bgcolor: 'background.default'}}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}> Password Rules</AccordionSummary>
            <AccordionDetails>
              <Typography variant='body'>Password should have:-</Typography>
              <List sx={{ listStyleType: 'disc', pl: 4 }}>
                <ListItem sx={{ display: 'list-item' }}>Minimum 8 characters.</ListItem>
                <ListItem sx={{ display: 'list-item' }}>One or more uppercase letters.</ListItem>
                <ListItem sx={{ display: 'list-item' }}>One or more lowercase letters.</ListItem>
                <ListItem sx={{ display: 'list-item' }}>One or more number.</ListItem>
                <ListItem sx={{ display: 'list-item' }}>One or more special character.</ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Button
          type="button"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={userRegister}
          disabled={!Object.values(errors).every(value => value === null || value === '')}
        >
            Register
        </Button>
      </Grid>
      <Divider sx={{my:2}}>Or Sign-up Using: </Divider>
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
              <path fill="#3c5a9a" d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"></path>
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
  )
}