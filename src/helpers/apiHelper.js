require('dotenv')
import axios from 'axios'
// apply base url for axios
const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL

export const axiosApi = axios.create({
  baseURL: API_URL
})

axiosApi.interceptors.response.use(function (response) {
  return response?.data
}, function (error) {
  if (error?.response?.data?.statusCode === 422) {
    localStorage.clear()
    alert('Unauthorized!')
  } else {
    // eslint-disable-next-line no-undef
    return Promise.resolve(error?.response?.data)
  }
})

export async function get (url, config = {}) {
  try {
    if (localStorage.getItem('accessToken')) {
      const data1 = JSON.parse(localStorage.getItem('accessToken'))
      axiosApi.defaults.headers.common['X-AUTH-TOKEN'] = data1
    }
    const response = await axiosApi.get(url, { ...config })
    if (response?.attributes) {
      window.localStorage.clear()
      window.location = '/login'
    }
    return response
  } catch (error) {
    return error
  }
}

export async function post (url, data, config = {}) {
  try {
    if (localStorage.getItem('accessToken')) {
      const data1 = JSON.parse(localStorage.getItem('accessToken'))
      axiosApi.defaults.headers.common['X-AUTH-TOKEN'] = data1

      if (config.headers) {
        axiosApi.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      }
    }
    const response = await axiosApi.post(url, { ...data }, { ...config })
    if (response?.attributes) {
      window.localStorage.clear()
      window.location = '/login'
    }
    return response
  } catch (error) {
    return error
  }
}

export const put = async (url, data, config = {}) => {
  try {
    if (localStorage.getItem('accessToken')) {
      const data1 = JSON.parse(localStorage.getItem('accessToken'))
      axiosApi.defaults.headers.common['X-AUTH-TOKEN'] = data1

      if (config.headers) {
        axiosApi.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      }
    }
    const response = await  axiosApi.put(url, { ...data }, { ...config })
    if (response?.attributes) {
      window.localStorage.clear()
      window.location = '/login'
    }
    return response
  } catch (error) {
    return error
  }
}

export const  del = async (url, config = {})  =>  {
  try {
    if (localStorage.getItem('accessToken')) {
      const data1 = JSON.parse(localStorage.getItem('accessToken'))
      axiosApi.defaults.headers.common['X-AUTH-TOKEN'] = data1

      if (config.headers) {
        axiosApi.defaults.headers.common['Content-Type'] = 'multipart/form-data'
      }
    }
    const response = await axiosApi.delete(url, { ...config })
    if (response?.attributes) {
      window.localStorage.clear()
      window.location = '/login'
    }
    return response
  } catch (error) {
    return error
  }
}