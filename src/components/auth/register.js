import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { matchIsValidTel } from 'mui-tel-input'
import { useRouter } from 'next/router'
import zxcvbn from 'zxcvbn'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import { Box, Typography } from '@mui/material'

import { loginUser, registerUser } from '@/store/auth'
import { convertToBase64 } from '@/helpers/fileHelper'
import RegistrationDetails from './userRegDetails'

export default function RegisterTab () {
  // Hooks
  const dispatch = useDispatch()
  const router = useRouter()

  // States
  const [inputData, setInputData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    image: '/guest.jpg'
  })
  const [inputErrors, setInputErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
    cnfPassword: ''
  })
  // Methods
  const userRegister = async () => {
    try {
      const response = await dispatch(registerUser(inputData)).unwrap()
      if (response.status.success) {
        toast.success(response.status.message)
        loginAfterRegistration()
      }
    } catch (ex) {
      toast.error(ex.message)
    }
  }

  const loginAfterRegistration = async () => {
    try {
      const response = await dispatch(loginUser({email: inputData.email, password: inputData.password})).unwrap()
      if (response.status.success) {
        localStorage.setItem('accessToken', JSON.stringify(response?.data?.access_token))
        localStorage.setItem('authUser', JSON.stringify(response?.data?.user))
        Cookies.set('accessToken', JSON.stringify(response?.data?.access_token), { expires: 1 })
        dispatch({type: 'localstorage/get'})
        router.reload()
      }
    } catch (ex) {
      toast.error(ex.message)
    }
  }

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
      if (!/^[a-z A-Z ]*$/.test(input)) {
        setInputErrors({
          ...inputErrors,
          [key]: 'Only alphabetical characters are allowed!'
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
    } else if (key === 'password') {
      const { score } = zxcvbn(inputData.password)
      if (score < 2) {
        setInputErrors({
          ...inputErrors,
          [key]: 'Password is too weak'
        })
      } else {
        setInputErrors({
          ...inputErrors,
          [key]: ''
        })
      }
    } else if (key === 'cnfPassword') {
      if (inputData.password !== input) {
        setInputErrors({
          ...inputErrors,
          [key]: 'Passwords don\'t match!'
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

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography component="h1" variant="h5">
      Create Your Account!
      </Typography>

      <RegistrationDetails
        inputData={inputData}
        errors={inputErrors}
        handleInput={handleInput}
        validateInput={validateInput}
        userRegister={userRegister}
      />
    </Box>
  )
}