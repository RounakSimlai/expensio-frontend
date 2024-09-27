import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input'
import { Avatar, Box, Divider, Drawer, Grid, IconButton, TextField, Typography, Link, Tooltip } from '@mui/material'
import { Close as CloseIcon, Cached as CachedIcon, Save as SaveIcon, Edit as EditIcon } from '@mui/icons-material'
import styled from '@emotion/styled'
import { updateUserProfile } from '@/store/auth'
import { convertToBase64 } from '@/helpers/fileHelper'

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

export default function UserProfileSidebar ({openProfileSidebar, toggleProfileSidebar}) {
  // Hooks
  const dispatch = useDispatch()

  // States
  const userData = useSelector(state => state?.storage?.authUser)
  const [isEdit, setIsEdit] = useState(false)
  const [isView, setIsView] = useState(true)
  const [inputData, setInputData] = useState({
    image: null,
    first_name: null,
    last_name: null,
    email: null,
    phone_number: null
  })
  const [inputErrors, setInputErrors] = useState({
    first_name: '',
    email: '',
    phone_number: ''
  })

  // Methods

  const handleInput = async (input, key) => {
    if (key === 'image') {
      try {
        if (input) {
          setInputData({
            ...inputData,
            image: await convertToBase64(input)
          })
        }
      } catch (ex) {
        toast.error(ex.message)
      }
    } else {
      setInputData({
        ...inputData,
        [key]: input
      })
    }
  }

  const validateInput = (input, key) => {
    if (!input || input === '') {
      setInputErrors({
        ...inputErrors,
        [key]: 'This Field is Required'
      })
    } else {
      setInputErrors({
        ...inputErrors,
        [key]: ''
      })
    }
    if (key === 'first_name' || key === 'last_name') {
      if (!/^[a-z A-Z]*$/.test(input)) {
        setInputErrors({
          ...inputErrors,
          [key]: 'Only alphabetical characters are allowed'
        })
      } else {
        setInputErrors({
          ...inputErrors,
          [key]: ''
        })
      }
    } else if (key === 'email') {
      if (input !== '' && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) {
        setInputErrors({
          ...inputErrors,
          [key]: 'Invalid Email'
        })
      } else {
        setInputErrors({
          ...inputErrors,
          [key]: ''
        })
      }
    } else if (key === 'phone_number') {
      if (matchIsValidTel(input)) {
        setInputErrors({
          ...inputErrors,
          [key]: ''
        })
      } else {
        setInputErrors({
          ...inputErrors,
          [key]: 'Invalid Phone Number'
        })
      }
    }
  }

  const editUserDetails = () => {
    setInputErrors({
      first_name: '',
      last_name: '',
      email: '',
      phone_number: ''
    })
    setInputData(userData)
    setIsView(false)
    setIsEdit(true)
  }

  const updateUser = async () => {
    try {
      const payload = {
        id: inputData?.id,
        image: inputData?.image,
        first_name: inputData.first_name,
        last_name: inputData?.last_name,
        email: inputData.email,
        phone_number: inputData.phone_number
      }
      const response = await dispatch(updateUserProfile(payload)).unwrap()
      if (response.status.success) {
        toast.success(response.status.message)
        localStorage.setItem('authUser', JSON.stringify({...userData, ...payload}))
        dispatch({type: 'localstorage/get'})
        setIsView(true)
        setIsEdit(false)
      }
    } catch (ex) {
      toast.error(ex.message)
    }
  }

  return (
    <>
      <Drawer
        anchor='right'
        open={openProfileSidebar}
      >
        <Box sx={{width:'500px'}}>
          {/* Header start */}
          <Grid container justifyContent='space-between' alignItems="center">
            <Grid item>
              <Typography variant='h5' ml={5} py={2} textAlign={'center'}>Your Profile</Typography>
            </Grid>
            {isEdit && (
              <>
                <Grid item>
                  <Tooltip title="Reset">
                    <IconButton onClick={() => { setIsView(true); setIsEdit(false) }}>
                      <CachedIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Save">
                    <IconButton onClick={updateUser}>
                      <SaveIcon color='success' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close">
                    <IconButton onClick={toggleProfileSidebar}>
                      <CloseIcon color='error' />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            )}
            {isView && (
              <>
                <Grid item>
                  <Tooltip title="Edit">
                    <IconButton onClick={editUserDetails}>
                      <EditIcon color='primary' />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Close">
                    <IconButton onClick={toggleProfileSidebar}>
                      <CloseIcon color='error' />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </>
            )}
          </Grid>
          {/* Header End */}
          <Divider />
          {/* Body Start */}
          <Box sx={{p:2, maxHeight: '100%', overflowY: 'auto'}}>

            <>
              <Grid container justifyContent='center' alignItems="center" pt={2} pb={2} spacing={2}>
                {isView && (
                  <Avatar alt='image' variant="rounded" src={userData.image ? userData.image : '/images/user/guest.jpg'} sx={{width: 200, height: 200, mb:1}} />
                )}
                {
                  (isEdit) && (
                    <>
                      <label htmlFor='hidden-input' style={{cursor: 'pointer'}}>
                        <Avatar alt='image' variant="rounded" src={isView ? userData.image : (inputData.image ? inputData.image : '/images/user/guest.jpg') } sx={{width: 200, height: 200, mb:1}} />
                      </label>
                      <VisuallyHiddenInput id='hidden-input' type="file" onChange={(event) => { handleInput(event.target.files[0], 'image') }} accept=".png, .jpg, .jpeg"/>
                    </>
                  )}

              </Grid>
              <Grid container justifyContent='space-between' alignItems="center" spacing={3} pb={2}>
                <Grid item xs={6}>
                  <TextField
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    value={isView ? userData.first_name : inputData.first_name}
                    error={inputErrors.first_name !== '' }
                    helperText={inputErrors.first_name}
                    required
                    fullWidth
                    autoFocus
                    autoComplete="off"
                    InputProps={{autocomplete: 'off', readOnly: isView}}
                    onChange={(e) => { handleInput(e.target.value, 'first_name') }}
                    onKeyUp={(e) => { validateInput(e.target.value, 'first_name') }}
                    onblur={(e) => { validateInput(e.target.value, 'first_name') }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    value={isView ? userData.last_name : inputData.last_name}
                    fullWidth
                    autoComplete="off"
                    InputProps={{autocomplete: 'off', readOnly: isView}}
                    onChange={(e) => { handleInput(e.target.value, 'last_name') }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' alignItems="center" spacing={3} pb={2}>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    value={isView ? userData.email : inputData.email}
                    error={inputErrors.email !== '' }
                    helperText={inputErrors.email}
                    type='email'
                    required
                    fullWidth
                    autoComplete="off"
                    InputProps={{autocomplete: 'off', readOnly: isView}}
                    onChange={(e) => { handleInput(e.target.value, 'email') }}
                    onKeyUp={(e) => { validateInput(e.target.value, 'email') }}
                    onblur={(e) => { validateInput(e.target.value, 'email') }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent='space-between' alignItems="center" spacing={3} pb={2}>
                <Grid item xs={12}>
                  <MuiTelInput
                    required
                    value={isView ? userData.phone_number : inputData.phone_number}
                    defaultCountry="IN"
                    fullWidth
                    autoComplete="off"
                    InputProps={{autocomplete: 'off', readOnly: isView}}
                    preferredCountries={['IN', 'BD', 'LK', 'NP', 'BT', 'CN', 'MM', 'PK']}
                    onChange={(e) => { handleInput(e, 'phone_number') }}
                    onKeyUp={(e) => { validateInput(e.target.value, 'phone_number') }}
                    onblur={(e) => { validateInput(e.target.value, 'phone_number') }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={12}>
                  <Link href="#" variant="body2">
                   Change password
                  </Link>
                </Grid>
              </Grid>
            </>
          </Box>
          {/* Body End */}
        </Box>
      </Drawer>
    </>
  )
}