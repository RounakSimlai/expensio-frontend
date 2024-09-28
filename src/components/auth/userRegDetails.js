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
    </Box>
  )
}